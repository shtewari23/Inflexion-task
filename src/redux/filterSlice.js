import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    tags: [],
  },
  reducers: {
    toggleFilter: (state, action) => {
      if (state.tags.includes(action.payload)) {
        state.tags = state.tags.filter((tag) => tag !== action.payload);
      } else {
        state.tags.push(action.payload);
      }
    },
  },
});

export const { toggleFilter } = filterSlice.actions;
export default filterSlice.reducer;
