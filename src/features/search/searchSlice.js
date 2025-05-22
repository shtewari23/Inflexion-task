// Redux slice: tabsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTabs: [],
  selectedTabs: [],
  searchResults: [], // added search results state
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setAllTabs: (state, action) => {
      state.allTabs = action.payload;
    },
    toggleSelectedTab: (state, action) => {
      const tab = action.payload.trim();
      console.log('Toggling tab:', tab);

      // Normalize current selected tabs for case-insensitive comparison
      const normalizedSelectedTabs = state.selectedTabs.map((t) => t.trim().toLowerCase());
      const tabLower = tab.toLowerCase();
      const isAlreadySelected = normalizedSelectedTabs.includes(tabLower);

      if (isAlreadySelected) {
        state.selectedTabs = state.selectedTabs.filter(
          (t) => t.trim().toLowerCase() !== tabLower
        );
      } else {
        state.selectedTabs.push(tab);
      }
    },
    unselectTab: (state, action) => {
      const tab = action.payload;
      state.selectedTabs = state.selectedTabs.filter((t) => t !== tab);
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload; // Set search results array
    },
  },
});

export const { setAllTabs, toggleSelectedTab, unselectTab, setSearchResults } = tabsSlice.actions;
export default tabsSlice.reducer;
