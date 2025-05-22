import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TabsHeader from './TabsHeader';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as searchApi from '../searchApi';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../searchApi', () => ({
  fetchExecutives: jest.fn(),
  fetchCompanies: jest.fn(),
}));

describe('TabsHeader', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tabs: {
        allTabs: [],
        selectedTabs: [],
      },
    });
  });

  it('renders without crashing', async () => {
    searchApi.fetchExecutives.mockResolvedValue(['Exec1', 'Exec2']);
    searchApi.fetchCompanies.mockResolvedValue(['Company1', 'Company2']);

    render(
      <Provider store={store}>
        <TabsHeader />
      </Provider>
    );

    await waitFor(() => {
      expect(searchApi.fetchExecutives).toHaveBeenCalled();
      expect(searchApi.fetchCompanies).toHaveBeenCalled();
    });
  });

  it('displays visible tabs and overflow chip', async () => {
    store = mockStore({
      tabs: {
        allTabs: ['Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5', 'Tab6'],
        selectedTabs: [],
      },
    });

    render(
      <Provider store={store}>
        <TabsHeader />
      </Provider>
    );

    // 4 visible tabs + overflow chip
    expect(screen.getByText('Tab1')).toBeInTheDocument();
    expect(screen.getByText('Tab4')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument(); // expand chip
  });

  it('shows overflow tabs on expand', () => {
    store = mockStore({
      tabs: {
        allTabs: ['Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5', 'Tab6'],
        selectedTabs: [],
      },
    });

    render(
      <Provider store={store}>
        <TabsHeader />
      </Provider>
    );

    const expandChip = screen.getAllByRole('button')[0]; // expand chip
    fireEvent.click(expandChip);

    expect(screen.getByText('Tab5')).toBeInTheDocument();
    expect(screen.getByText('Tab6')).toBeInTheDocument();
  });

  it('selects and unselects a tab on click', () => {
    store = mockStore({
      tabs: {
        allTabs: ['AI'],
        selectedTabs: [],
      },
    });

    render(
      <Provider store={store}>
        <TabsHeader />
      </Provider>
    );

    const chip = screen.getByText('AI');
    fireEvent.click(chip);

    const actions = store.getActions();
    expect(actions.some(a => a.type === 'tabs/toggleSelectedTab')).toBeTruthy();
  });

  it('unselects a selected tab on delete icon click', () => {
    store = mockStore({
      tabs: {
        allTabs: ['AI'],
        selectedTabs: ['AI'],
      },
    });

    render(
      <Provider store={store}>
        <TabsHeader />
      </Provider>
    );

    const deleteIcon = screen.getByRole('button', { name: /close/i });
    fireEvent.click(deleteIcon);

    const actions = store.getActions();
    expect(actions.some(a => a.type === 'tabs/unselectTab')).toBeTruthy();
  });
});
