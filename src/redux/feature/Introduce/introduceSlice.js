import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactApi } from "../../../apis/contactApi";
import { introduceApi } from "../../../apis/introduceApi";

const initialState = {
  introduce: [],
  errors: {},
};
export const actGetIntroduce = createAsyncThunk(
  "introduce/getIntroduce",
  async () => {
    const { data } = await introduceApi.getIntroduce();

    return data;
  }
);
export const introduceSlice = createSlice({
  name: "introduce",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetIntroduce.pending, (state, action) => {
      console.log();
    });
    builder.addCase(actGetIntroduce.rejected, (state, action) => {
      state.errors = {};
    });
    builder.addCase(actGetIntroduce.fulfilled, (state, action) => {
      state.introduce = action.payload;
    });
  },
});
export const {} = introduceSlice.actions;
export default introduceSlice.reducer;
