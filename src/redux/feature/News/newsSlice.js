import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsApi } from "../../../apis/newsApi";

const initialState = {
  news: [],
};
export const actGetAllNews = createAsyncThunk("news/getAllNews", async () => {
  const { data } = await newsApi.getAllNews();

  return data;
});
export const newsSlice = createSlice({
  name: "banner",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetAllNews.pending, (state, action) => {
      console.log();
    });
    builder.addCase(actGetAllNews.rejected, (state, action) => {});
    builder.addCase(actGetAllNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
  },
});
export const {} = newsSlice.actions;
export default newsSlice.reducer;
