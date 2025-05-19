import { createSlice } from "@reduxjs/toolkit";
import mockData from "../mock/podcasts.json";

const podcastSlice = createSlice({
  name: "podcasts",
  initialState: {
    data: mockData,
  },
  reducers: {},
});

export default podcastSlice.reducer;
