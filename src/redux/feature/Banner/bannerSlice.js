import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bannersApi } from "../../../apis/bannersApi";

const initialState = {
  banners: [],
  errors: {},
};
export const actfetchAllBanners = createAsyncThunk(
  "banners/fetchAllBanners",
  async () => {
    const { data } = await bannersApi.getAllBanners();

    return data;
  }
);
export const bannerSlice = createSlice({
  name: "banner",
  initialState: initialState,
  reducers: {
    getAllBanners(state, action) {
      state.banners = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actfetchAllBanners.pending, (state, action) => {
      console.log();
    });
    builder.addCase(actfetchAllBanners.rejected, (state, action) => {
      state.errors = {};
    });
    builder.addCase(actfetchAllBanners.fulfilled, (state, action) => {
      state.banners = action.payload;
    });
  },
});
export const { getAllBanners } = bannerSlice.actions;
export default bannerSlice.reducer;
