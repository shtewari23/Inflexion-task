import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTabs: [],       // e.g. ["John Doe", "Jane Smith"]
  selectedTabs: [],  // selected full names as strings
};

const searchSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setAllTabs: (state, action) => {
      state.allTabs = action.payload;
    },
    toggleSelectedTab: (state, action) => {
      const tab = action.payload;
      if (state.selectedTabs.includes(tab)) {
        state.selectedTabs = state.selectedTabs.filter((t) => t !== tab);
      } else {
        state.selectedTabs.push(tab);
      }
    },
    unselectTab: (state, action) => {
      const tab = action.payload;
      state.selectedTabs = state.selectedTabs.filter((t) => t !== tab);
    },
  },
});

export const { setAllTabs, toggleSelectedTab, unselectTab } = searchSlice.actions;
export default searchSlice.reducer;
