import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersRecordApi } from "../../../apis/ordersRecordApi";

const initialState = {
  orders: [],
  orderSucceed: [],
};

export const actAddOrder = createAsyncThunk(
  "orders/addOrders",
  async (item) => {
    return await ordersRecordApi.addOrder(item);
  }
);
export const actGetAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async () => {
    const { data } = await ordersRecordApi.getAllorders();
    return data;
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
      state.orders = action.payload;
    });
  },
});
export const { setOrderSucceed } = ordersRecordSlice.actions;
export default ordersRecordSlice.reducer;
