import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logosApi } from "../../../apis/logosApi";

const initialState = {
  isLoading: false,
  logos: [],
  errors: {},
};
export const actfetchAllLogos = createAsyncThunk(
  "logos/fetchAllLogos",
  async () => {
    const { data } = await logosApi.getAllLogos();

    return data;
  }
);
export const logoSlice = createSlice({
  name: "logos",
  initialState: initialState,
  reducers: {
    getAllLogos(state, action) {
      state.logos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actfetchAllLogos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actfetchAllLogos.rejected, (state, action) => {
      state.errors = {};
    });
    builder.addCase(actfetchAllLogos.fulfilled, (state, action) => {
      state.logos = action.payload;
    });
  },
});
export const { getAllLogos } = logoSlice.actions;
export default logoSlice.reducer;
