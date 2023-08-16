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
import serviceReducer from "../feature/service/serviceSlice";
import locationReducer from "../feature/Location/getLocationSlice";
import contactReducer from "../feature/Contact/contactSlice";
import introduceReducer from "../feature/Introduce/introduceSlice";
import saleStatusReducer from "../feature/SaleStatusSlice/saleStatusSlice";
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
    service: serviceReducer,
    location: locationReducer,
    contact: contactReducer,
    introduce: introduceReducer,
    saleStatus: saleStatusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
