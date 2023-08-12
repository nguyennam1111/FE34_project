import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productCommentApi } from "../../../apis/productCommentApi";
import { toast } from "react-toastify";

const initialState = {
  productComments: [],
};

export const actAddComment = createAsyncThunk(
  "productComments/addComment",
  async (inputComment) => {
    try {
      return await productCommentApi.addComment(inputComment);
    } catch (error) {
      console.log(error, "error");
    }
  }
);

export const actGetAllComments = createAsyncThunk(
  "productComments/getAllComment",
  async (params) => {
    const data = productCommentApi.getAllComments(params);

    return data;
  }
);
export const actGetCommentDetails = createAsyncThunk(
  "productComments/getCommentDetails",
  async (id) => {
    const { data } = productCommentApi.actGetCommentDetails(id);
    return data;
  }
);

export const productCommentsSlice = createSlice({
  name: "userComments",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetAllComments.pending, (state, action) => {});
    builder.addCase(actGetAllComments.rejected, (state, action) => {});
    builder.addCase(actGetAllComments.fulfilled, (state, action) => {
      state.productComments = action.payload;
    });
    builder.addCase(actAddComment.pending, (state, action) => {
      console.log(action.payload, "pending");
    });
    builder.addCase(actAddComment.rejected, (state, action) => {
      console.log(action.payload, "reject");
    });
    builder.addCase(actAddComment.fulfilled, (state, action) => {});
  },
});
export const {} = productCommentsSlice.actions;
export default productCommentsSlice.reducer;
