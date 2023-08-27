import React, { useState, useEffect } from "react";
import "./stylePayment.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useForm, Controller, Select } from "react-hook-form";
import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";

import {
  actAddOrder,
  actGetAllOrders,
  setOrderSucceed,
  setOrderSuccess,
  setPage,
} from "../../redux/feature/ordersRecord/ordersRecordSlice";
import { ToastContainer } from "react-toastify";
import OrderPayment from "../../components/Order/OrderPayment";
import ShowOrderSucceed from "../../components/Order/ShowOrderSucceed";
import { actFetchAllUserAccounts } from "../../redux/feature/UserAccount/userAccountSlice";
import OrderHistory from "../../components/Order/OrderHistory";

const Payment = () => {
  const callBackUrl = window.location.pathname;

  localStorage.setItem("callBackUrl", JSON.stringify(callBackUrl));
  const [searchParams] = useSearchParams();
  const [shippingFee, setShippingFee] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totalAmount, totalItemQty } = useSelector(
    (state) => state.cart
  );
  const { orderSucceed, orders, pagination } = useSelector(
    (state) => state.orders
  );
  const { isAuth, userProfile } = useSelector((state) => state.auth);
  const { userAccounts } = useSelector((state) => state.userAccount);
  const orderStatus = searchParams.get("status");

  useEffect(() => {
    dispatch(setOrderSucceed());
    dispatch(actFetchAllUserAccounts());
  }, []);
  // useEffect(() => {
  //   dispatch(setPage(1));
  // }, []);
  // useEffect(() => {
  //   dispatch(
  //     actGetAllOrders({
  //       _page: pagination.currentPage,
  //       _limit: pagination.pageSize,
  //       orderEmail: userProfile.email,
  //     })
  //   );
  //   handleChangePage(pagination.currentPage);
  // }, [userProfile.email, pagination.currentPage]);
  // const handleChangePage = (newPage) => {
  //   dispatch(setPage(newPage));
  // };
  switch (orderStatus) {
    case "succeed":
      return (
        <>
          <ShowOrderSucceed
            orderSucceed={orderSucceed}
            // cart={cart}
            // totalItemQty={totalItemQty}
            // totalAmount={totalAmount}
          />
        </>
      );
      break;
    case "history":
      return (
        <>
          <OrderHistory
          // handleChangePage={handleChangePage}
          // pagination={pagination}
          // orders={orders}
          />
        </>
      );
      break;
    default:
      return (
        <>
          <OrderPayment
            cart={cart}
            totalAmount={totalAmount}
            searchParams={searchParams}
            totalItemQty={totalItemQty}
          />
        </>
      );
      break;
  }
};

export default Payment;
