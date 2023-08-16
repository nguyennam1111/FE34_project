import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../../../apis/cartApi";
import { toast } from "react-toastify";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) ?? [],
  totalAmount:
    JSON.parse(localStorage.getItem("cart"))
      ?.map((item) => item.productAmount)
      ?.reduce((total, num) => {
        return total + num;
      }, 0) ?? "",
  totalItemQty:
    JSON.parse(localStorage.getItem("cart"))
      ?.map((item) => item.productQty)
      ?.reduce((total, num) => {
        return total + Number(num);
      }, 0) ?? "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      toast(
        <div>
          <p>SẢN PHẨM ĐÃ ĐƯỢC THÊM VÀO GIỎ HÀNG</p>

          <div className="d-flex justify-content-between">
            <div>
              <p className="m-0">
                {action.payload.product?.productName}, kiểu:
                {action.payload?.sizeAndColor}
              </p>

              <p className="m-0">Số lượng:{action.payload?.inputQty}</p>
            </div>
            <img
              src={action.payload.product?.productsImg[0]}
              className=""
              style={{ width: 50, maxWidth: "100%" }}
            ></img>
          </div>
        </div>
      );

      const existCartItemIndex = state.cart.findIndex(
        (item) =>
          item.productCode === action.payload.product.productCode &&
          item.sizeAndColor === action.payload.sizeAndColor
      );

      if (existCartItemIndex >= 0) {
        state.cart[existCartItemIndex] = {
          ...state.cart[existCartItemIndex],
          productQty:
            +state.cart[existCartItemIndex].productQty +
            Number(action.payload.inputQty),
          productAmount:
            (Number(state.cart[existCartItemIndex].productQty) +
              Number(action.payload.inputQty)) *
            Number(state.cart[existCartItemIndex].productPrice),
        };
      } else {
        let autoId = 0;
        autoId =
          state.cart.length === 0
            ? 0
            : Math.max(...state.cart.map((item) => item.id));

        state.cart.push({
          id: autoId + 1,
          productId: action.payload.product.id,
          productCode: action.payload.product.productCode,
          productName: action.payload.product.productName,
          sizeAndColor: action.payload.sizeAndColor,
          productImg: action.payload.product.productsImg[0],
          productPrice: Number(action.payload.product.productPrice),
          productQty: action.payload.inputQty,
          productAmount:
            Number(action.payload.product.productPrice) *
            Number(action.payload.inputQty),
          createdAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
        });
      }
      state.totalAmount = state.cart
        ?.map((item) => item.productAmount)
        .reduce((total, num) => {
          return total + Number(num);
        }, 0);

      state.totalItemQty = state.cart
        ?.map((item) => item.productQty)
        .reduce((total, num) => {
          return total + Number(num);
        }, 0);

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    deleteCartItem: (state, action) => {
      const deleteIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );

      if (deleteIndex >= 0) {
        state.cart.splice(deleteIndex, 1);

        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
      state.totalAmount = state.cart
        .map((item) => item.productAmount)
        .reduce((total, num) => {
          return total + num;
        }, 0);

      state.totalItemQty = state.cart
        .map((item) => item.productQty)
        .reduce((total, num) => {
          return total + num;
        }, 0);
    },
    setCartItemQty: (state, action) => {
      const editIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (editIndex >= 0) {
        const _cart = [...state.cart];
        _cart[editIndex].productQty = action.payload.value;

        state.cart = [..._cart];
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    updateCartValue: (state, action) => {
      state.cart.map((item) => {
        item.productAmount = item.productPrice * item.productQty;
      });

      const itemQty0_Index = state.cart.findIndex(
        (item) => item.productQty == 0
      );
      if (itemQty0_Index >= 0) {
        state.cart.splice(itemQty0_Index, 1);
      }
      state.totalAmount = state.cart
        .map((item) => item.productAmount)
        .reduce((total, num) => {
          return total + Number(num);
        }, 0);

      state.totalItemQty = state.cart
        .map((item) => item.productQty)
        .reduce((total, num) => {
          return total + Number(num);
        }, 0);

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state, action) => {
      state.cart = [];
      state.totalAmount = "";
      state.totalItemQty = "";
      localStorage.removeItem("cart");
    },
  },
});
export const {
  addItemToCart,
  deleteCartItem,
  getAllCartItem,
  setSizeAndColor,
  setCartItemQty,
  updateCartValue,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
