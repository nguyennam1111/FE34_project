import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersRecordApi } from "../../../apis/ordersRecordApi";

const initialState = {
  orders: [],
  orderSucceed: [],
  orderByUser: [],
  pagination: {
    currentPage: 1,
    pageSize: 1,
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
  async (params, item) => {
    const respond = await ordersRecordApi.getAllOrders(params, {
      orderEmail: item.orderEmail,
    });
    return respond;
  }
);
export const actGetOrderByUser = createAsyncThunk(
  "orders/GetOrderByUser",
  async (item) => {
    const respond = await ordersRecordApi.getAllOrders({
      orderEmail: item.orderEmail,
    });
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
  },
  extraReducers: (builder) => {
    builder.addCase(actAddOrder.pending, (state, action) => {});
    builder.addCase(actAddOrder.rejected, (state, action) => {});
    builder.addCase(actAddOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(actGetAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload.data;
      state.pagination.totalOrders = action.payload.headers["x-total-count"];
    });
    builder.addCase(actGetOrderByUser.fulfilled, (state, action) => {
      state.orderByUser = action.payload.data;
    });
  },
});
export const { setOrderSucceed } = ordersRecordSlice.actions;
export default ordersRecordSlice.reducer;
