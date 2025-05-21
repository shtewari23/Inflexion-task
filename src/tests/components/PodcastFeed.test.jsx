import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PodcastFeed from './PodcastFeed'; // adjust path
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('axios');

const mockStore = configureStore([]);

const talksMock = [
  {
    id: '1',
    title: 'Mock Talk 1',
    description: 'Description 1',
    investor_note: '<ul><li>Note 1</li></ul>',
    executive_name: 'John Doe',
    company_name: 'Company A',
    published_date: '2023-01-01',
  },
];

describe('PodcastFeed component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tabs: {
        selectedTabs: [],
      },
    });
  });

  test('fetches and displays talks', async () => {
    axios.get.mockResolvedValue({
      data: {
        status: 'success',
        data: talksMock,
      },
    });

    render(
      <Provider store={store}>
        <PodcastFeed />
      </Provider>
    );

    // Wait for the talks to appear
    await waitFor(() => expect(screen.getByText('Mock Talk 1')).toBeInTheDocument());

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('shows loading skeleton initially', () => {
    axios.get.mockReturnValue(new Promise(() => {})); // never resolves

    render(
      <Provider store={store}>
        <PodcastFeed />
      </Provider>
    );

    expect(screen.getAllByRole('progressbar').length).toBeGreaterThan(0); // Skeleton renders progressbars
  });
});
