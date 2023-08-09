import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/ProductSlice/productSlice";
import logoReducer from "../feature/LogoSlice/logoSlice";
import bannerReducer from "../feature/Banner/bannerSlice";
import cartReducer from "../feature/Cart/cartSlice";
import userAccountReducer from "../feature/UserAccount/userAccountSlice";
import authReducer from "../feature/Authenticate/authSlice";
import ordersRecordReducer from "../feature/ordersRecord/ordersRecordSlice";
import guidanceReducer from "../feature/guidance/guidanceSlice";
import productCommentsReduce from "../feature/ProductComments/productCommentsSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    logo: logoReducer,
    banner: bannerReducer,
    cart: cartReducer,
    userAccount: userAccountReducer,
    auth: authReducer,
    orders: ordersRecordReducer,
    guidance: guidanceReducer,
    productComment: productCommentsReduce,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
