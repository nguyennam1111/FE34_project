import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { guidanceApi } from "../../../apis/guidanceApi";

const initialState = {
  guidance: [],
};
export const actfetchAllGuidance = createAsyncThunk(
  "guidance/fetchAllguidance",
  async () => {
    const { data } = await guidanceApi.getAllGuidance();

    return data;
  }
);
export const guidanceSlice = createSlice({
  name: "guidance",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actfetchAllGuidance.pending, (state, action) => {});
    builder.addCase(actfetchAllGuidance.rejected, (state, action) => {});
    builder.addCase(actfetchAllGuidance.fulfilled, (state, action) => {
      state.guidance = action.payload;
    });
  },
});
export const {} = guidanceSlice.actions;
export default guidanceSlice.reducer;
