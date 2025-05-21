import reducer, {
  setAllTabs,
  toggleSelectedTab,
  unselectTab,
} from './searchSlice';

describe('searchSlice reducer', () => {
  const initialState = {
    allTabs: [],
    selectedTabs: [],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setAllTabs', () => {
    const tabs = ['Tab1', 'Tab2'];
    const nextState = reducer(initialState, setAllTabs(tabs));
    expect(nextState.allTabs).toEqual(tabs);
  });

  it('should handle toggleSelectedTab - add tab', () => {
    const nextState = reducer(initialState, toggleSelectedTab('Tab1'));
    expect(nextState.selectedTabs).toEqual(['Tab1']);
  });

  it('should handle toggleSelectedTab - remove tab if already selected', () => {
    const state = {
      ...initialState,
      selectedTabs: ['Tab1', 'Tab2'],
    };
    const nextState = reducer(state, toggleSelectedTab('Tab1'));
    expect(nextState.selectedTabs).toEqual(['Tab2']);
  });

  it('should handle unselectTab - remove only specified tab', () => {
    const state = {
      ...initialState,
      selectedTabs: ['Tab1', 'Tab2', 'Tab3'],
    };
    const nextState = reducer(state, unselectTab('Tab2'));
    expect(nextState.selectedTabs).toEqual(['Tab1', 'Tab3']);
  });
});
