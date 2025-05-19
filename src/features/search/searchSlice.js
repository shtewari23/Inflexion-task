// src/redux/searchSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTabs: ['Tab 1', 'Tab 2', 'Tab 3'],
  selectedTab: 'Tab 1',
};

const searchSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setSelectedTab(state, action) {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = searchSlice.actions;
export default searchSlice.reducer;
