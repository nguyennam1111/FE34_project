import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productCommentApi } from "../../../apis/productCommentApi";
import { toast } from "react-toastify";

const initialState = {
  productComments: [],
  averageRate: "",
  starDetails: [],
  starDetailsValue: [],
  productCommentsDetail: [],
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
    const data = await productCommentApi.getAllComments(params);

    let starDetails = [];
    let starDetailsValue = [];

    const listRate = data?.map((item) => (item.rate > 0 ? item.rate : ""));

    for (let i = 1; i <= 5; i++) {
      starDetails
        .push(
          data
            ?.map((item) => item.rate >= i && item.rate < i + 1)
            .reduce((total, num) => {
              return total + Number(num);
            }, 0)
        )
        .toFixed(1);

      starDetailsValue.push(
        (
          listRate

            ?.map((item) => (item >= i && item < i + 1 ? item : ""))
            .reduce((total, num) => {
              return total + Number(num);
            }, 0) / listRate?.filter((item) => item >= i && item < i + 1).length
        ).toFixed(1)
      );
    }

    const averageRate = (
      listRate.reduce((total, num) => {
        return total + Number(num);
      }, 0) / data?.filter((item) => item.rate > 0).length
    ).toFixed(1);
    return {
      data: data,
      starDetails: starDetails,
      averageRate: averageRate,
      starDetailsValue: starDetailsValue,
    };
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
      state.productComments = action.payload.data;
      state.starDetails = action.payload.starDetails;
      state.averageRate = action.payload.averageRate;
      state.starDetailsValue = action.payload.starDetailsValue;
    });
    builder.addCase(actGetCommentDetails.fulfilled, (state, action) => {});

    builder.addCase(actAddComment.fulfilled, (state, action) => {});
  },
});
export const {} = productCommentsSlice.actions;
export default productCommentsSlice.reducer;
