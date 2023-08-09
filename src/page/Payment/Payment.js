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
} from "../../redux/feature/ordersRecord/ordersRecordSlice";
import { ToastContainer } from "react-toastify";
import OrderPayment from "../../components/Order/OrderPayment";
import ShowOrderSucceed from "../../components/Order/ShowOrderSucceed";
import { actFetchAllUserAccounts } from "../../redux/feature/UserAccount/userAccountSlice";
import OrderHistory from "../../components/Information/OrderHistory";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [shippingFee, setShippingFee] = useState(null);
  const [payment, setPayment] = useState("COD");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totalAmount, totalItemQty } = useSelector(
    (state) => state.cart
  );
  const { orderSucceed, orders } = useSelector((state) => state.orders);
  const { isAuth, userProfile } = useSelector((state) => state.auth);
  const { userAccounts } = useSelector((state) => state.userAccount);
  const orderStatus = searchParams.get("status");

  useEffect(() => {
    dispatch(actGetAllOrders());
    dispatch(setOrderSucceed());
    dispatch(actFetchAllUserAccounts());
  }, []);

  switch (orderStatus) {
    case "succeed":
      return (
        <>
          <ShowOrderSucceed
            orderSucceed={orderSucceed}
            cart={cart}
            totalItemQty={totalItemQty}
            totalAmount={totalAmount}
          />
        </>
      );
      break;
    case "history":
      return (
        <>
          <OrderHistory
            orders={orders}
            userProfile={userProfile}
            userAccounts={userAccounts}
            isAuth={isAuth}
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
            setShippingFee={setShippingFee}
            setPayment={setPayment}
            shippingFee={shippingFee}
            payment={payment}
            totalItemQty={totalItemQty}
          />
        </>
      );
      break;
  }
};

export default Payment;
