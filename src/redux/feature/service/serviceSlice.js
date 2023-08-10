import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { serviceApi } from "../../../apis/serviceApi";

const initialState = {
  service: [],
};
export const actGetAllService = createAsyncThunk(
  "service/actGetAllService",
  async () => {
    const { data } = await serviceApi.getAllBanners();

    return data;
  }
);
export const serviceSlice = createSlice({
  name: "service",
  initialState: initialState,
  reducers: {
    getAllBanners(state, action) {
      state.service = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetAllService.pending, (state, action) => {
      console.log();
    });
    builder.addCase(actGetAllService.rejected, (state, action) => {});
    builder.addCase(actGetAllService.fulfilled, (state, action) => {
      state.service = action.payload;
    });
  },
});
export const { getAllservice } = serviceSlice.actions;
export default serviceSlice.reducer;
