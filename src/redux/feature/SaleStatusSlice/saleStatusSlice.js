import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saleStatusApi } from "../../../apis/saleStatusApi";

const initialState = {
  saleStatus: [],
};
export const actGetAllSaleStatus = createAsyncThunk(
  "saleStatus/actGetAllSaleStatus",
  async () => {
    const { data } = await saleStatusApi.getAllSaleStatus();
    return data;
  }
);
const saleStatusSlice = createSlice({
  name: "saleStatus",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetAllSaleStatus.fulfilled, (state, action) => {
      state.saleStatus = action.payload;
    });
  },
});
export const {} = saleStatusSlice.actions;
export default saleStatusSlice.reducer;
