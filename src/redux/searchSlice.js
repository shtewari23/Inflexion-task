import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    allTabs: ['All', 'Sam Altman', 'Infrastructure', 'Compute' ,'Sam Altman','Sam swss' , 'fes'],
    selectedTab: 'All',
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    removeTab: (state, action) => {
      const tabToRemove = action.payload;
      state.allTabs = state.allTabs.filter(tab => tab !== tabToRemove);

      // If the removed tab was selected, select the first remaining or none
      if (state.selectedTab === tabToRemove) {
        state.selectedTab = state.allTabs[0] || '';
      }
    },
  },
});

export const { setSelectedTab, removeTab } = searchSlice.actions;
export default searchSlice.reducer;
