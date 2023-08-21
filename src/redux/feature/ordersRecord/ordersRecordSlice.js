import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersRecordApi } from "../../../apis/ordersRecordApi";

const initialState = {
  orders: [],
  orderSucceed: [],

  pagination: {
    currentPage: 1,
    pageSize: 2,
    totalOrders: 0,
  },
};

export const actAddOrder = createAsyncThunk(
  "orders/addOrders",
  async (item) => {
    return await ordersRecordApi.addOrder(item);
  }
);
export const actGetAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (params) => {
    const respond = await ordersRecordApi.getAllOrders(params);
    return respond;
  }
);

export const ordersRecordSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    setOrderSucceed: (state, action) => {
      state.orderSucceed = action.payload;
    },
    setPage(state, action) {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actAddOrder.pending, (state, action) => {});
    builder.addCase(actAddOrder.rejected, (state, action) => {});

    builder.addCase(actGetAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload.data;
      state.pagination.totalOrders = action.payload.headers["x-total-count"];
      console.log(action.payload, "payload");
    });
  },
});
export const { setOrderSucceed, setPage } = ordersRecordSlice.actions;
export default ordersRecordSlice.reducer;
