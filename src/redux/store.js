import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './searchSlice'; // ✅ Correct path

const store = configureStore({
  reducer: {
    tabs: tabReducer,
  },
});

export default store;
