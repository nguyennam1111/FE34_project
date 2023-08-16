import React, { useEffect, useState } from "react";

import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "./OrderList";

import { useForm, Controller, Select } from "react-hook-form";
import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  actAddOrder,
  actGetAllOrders,
  setOrderSucceed,
} from "../../redux/feature/ordersRecord/ordersRecordSlice";
import { clearCart } from "../../redux/feature/Cart/cartSlice";
import { isAnyOf } from "@reduxjs/toolkit";
import { actGetAllProvince } from "../../redux/feature/Location/getLocationSlice";
import ShowLocation from "../Location/ShowLocation";
import {
  actGetProductbyId,
  actUpdateSaleQty,
  actfetchAllProducts,
} from "../../redux/feature/ProductSlice/productSlice";
import ProductDetails from "../../page/ProductDetails/ProductDetails";

const OrderPayment = (props) => {
  const phonePattern = /^([0|84])([3|5|7|8|9]{1})+(\d{8})$\b/g;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userAccounts } = useSelector((state) => state.userAccount);
  const { isAuth, userProfile } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.product);
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");

  useEffect(() => {
    dispatch(actGetAllOrders());
    dispatch(actfetchAllProducts());
  }, []);

  const schemaValidatePayment = Yup.object().shape({
    orderEmail: Yup.string().email("wrong email").required("Enter email"),
    fullName: Yup.string()
      .max(20, "tên không quá 20 ký tự")
      .required("Nhập họ và tên"),
    phone: Yup.string()
      .matches(phonePattern, "Sai số điện thoại")
      .required("nhập số điện thoại"),
    address: Yup.string().required("nhập địa chỉ"),
    province: Yup.string().required("Chọn tỉnh thành"),
    district: Yup.string().required("Chọn quận huyện"),
    ward: Yup.string().required("Chọn phường xã"),
    comments: Yup.string(),
    shippingType: Yup.string().required("Chọn phương pháp giao hàng"),
    // .oneOf(["normal", "fast"], "", "Chọn phương pháp giao hàng"),
    paymentMethod: Yup.string().required("Chọn phương thức thanh toán"),
    // .oneOf(["OnlinePayment", "COD"], "Chọn phương thức thanh toán"),
    transferMethod: Yup.string(),
  });

  const {
    register,
    handleSubmit: handlePayment,
    setValue,
    watch,
    formState: { errors: errors },
    control: control,
  } = useForm({
    defaultValue: {
      orderEmail: "",
      fullName: "",
      phone: "",
      address: "",
      province: "  ",
      district: "",
      ward: "",
      comments: "",
      shippingType: "",
      shippingFee: "",
      paymentMethod: "",
      transferMethod: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schemaValidatePayment),
  });

  //
  // products.map((list) => {
  //   const cartQty = props.cart
  //     ?.map((item) => (list.id == item.productId ? item.productQty : ""))
  //     .reduce((total, num) => {
  //       return total + Number(num);
  //     }, 0);
  //   const updateStock = {
  //     stock: {
  //       totalQty: list.stock.totalQty,
  //       saledQty: Number(list.stock.saledQty) + Number(cartQty),
  //     },
  //   };
  //   console.log(cartQty, "cartQty");
  //   console.log(updateStock, "updateStock");
  //    dispatch(
  //   actUpdateSaleQty({
  //     updateId: list.productId,
  //     updateItem: updateStock,
  //   })
  // );
  // });

  //
  const onPayment = (data) => {
    // create order code
    let orderCode = 0;

    orders?.map((item) =>
      item.orderCode !== `#${parseInt(Math.random() * 1000)}`
        ? (orderCode = `#${parseInt(Math.random() * 1000)}`)
        : ""
    );
    //
    dispatch(
      actAddOrder({
        ...data,
        province: provinceName,
        district: districtName,
        orderCode: orderCode,
        totalAmount: props.totalAmount,
        totalItemQty: props.totalItemQty,
        orderList: props.cart,
        orderAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
      })
    );
    dispatch(
      setOrderSucceed({
        ...data,
        province: provinceName,
        district: districtName,
        orderCode: orderCode,
        orderList: props.cart,
        orderAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
      })
    );
    // update saleQty

    products.map((list) => {
      const cartQty = props.cart
        ?.map((item) => (list.id == item.productId ? item.productQty : ""))
        .reduce((total, num) => {
          return total + Number(num);
        }, 0);
      const updateStock = {
        stock: {
          totalQty: list.stock.totalQty,
          saledQty: Number(list.stock.saledQty) + Number(cartQty),
        },
      };
      console.log(cartQty, "cartQty");
      console.log(updateStock, "updateStock", list.id, "list.id");

      dispatch(
        actUpdateSaleQty({
          updateId: list.id,
          updateItem: updateStock,
        })
      );
    });

    dispatch(clearCart());
    navigate("/Payment?status=succeed");
  };

  const handleBackToCart = () => {
    navigate(ROUTES.CART);
  };

  return (
    <div className="row container-fluid m-0">
      <div className="col-sm-8">
        <h4 className="text-title-normal py-4">KidShop</h4>
        <div className="row m-0">
          <div className="col-sm-6">
            <div className="row m-0 justify-content-between">
              <h5 className="col-sm-8 m-0 p-0">Thông tin nhận hàng</h5>
              <div
                className="col-sm-4 text-right p-0"
                style={isAuth ? { display: "none" } : { display: "" }}
              >
                <Link to={ROUTES.SIGNIN} className="text-right">
                  <i className="bi bi-person-fill pr-1 p-0 border rounded-circle"></i>
                  Đăng nhập
                </Link>
              </div>
            </div>
            <div>
              <form
                className="m-0 row"
                id="form-order"
                onSubmit={handlePayment(onPayment)}
              >
                <Controller
                  render={({ field }) => (
                    <input
                      type="email"
                      className="form-control mt-2 placeholder-"
                      placeholder="email*"
                      id="orderEmail"
                      {...field}
                      // onChange={(e) => setValue("orderEmail", e.target.value)}
                    />
                  )}
                  name="orderEmail"
                  control={control}
                  defaultValue={isAuth ? userProfile?.email : ""}
                />
                <p className="m-0 text-danger">{errors?.orderEmail?.message}</p>
                <Controller
                  render={({ field }) => (
                    <input
                      className="form-control mt-2"
                      placeholder="Họ và tên*"
                      id="fullName"
                      {...field}
                      // onChange={(e) => setValue("fullName", e.target.value)}
                    />
                  )}
                  name="fullName"
                  control={control}
                  defaultValue={isAuth ? userProfile?.fullName : ""}
                />
                <p className="m-0 text-danger">{errors?.fullName?.message}</p>
                <Controller
                  render={({ field }) => (
                    <input
                      className="form-control mt-2"
                      placeholder="Số điện thoại*"
                      id="phone"
                      {...field}
                      // onChange={(e) => setValue("phone", e.target.value)}
                    />
                  )}
                  name="phone"
                  control={control}
                  defaultValue={isAuth ? userProfile?.phone : ""}
                />
                <p className="m-0 text-danger">{errors?.phone?.message}</p>

                <Controller
                  render={({ field }) => (
                    <input
                      className="form-control col-12 mt-2"
                      placeholder="Địa chỉ*"
                      id="address"
                      {...field}
                      // onChange={(e) => setValue("address", e.target.value)}
                    />
                  )}
                  name="address"
                  control={control}
                  defaultValue=""
                />
                <p className="m-0 text-danger">{errors?.address?.message}</p>
                <ShowLocation
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  setProvinceName={setProvinceName}
                  setDistrictName={setDistrictName}
                />

                <textarea
                  // {...register("comments")}
                  className="form-control mt-2"
                  placeholder="Ghi chú"
                  id="comments"
                  name="comments"
                  // onChange={(e) => setValue("comments", e.target.value)}
                ></textarea>
              </form>
            </div>
          </div>

          <div className="col-sm-6 ">
            <div>
              <h4>Vận Chuyển</h4>
              <form form="form-order">
                <div className="row justify-content-between m-0 p-2 border rounded">
                  <label className="m-0 " htmlFor="shipping_fast">
                    <input
                      // {...register("shippingType")}
                      className="mr-2"
                      type="radio"
                      name="shippingType"
                      id="shipping_fast"
                      checked={watch("shippingType") == "Giao hàng nhanh"}
                      onChange={(e) => {
                        setValue("shippingType", "Giao hàng nhanh");
                        setValue("shippingFee", 35000);
                      }}
                    ></input>
                    Giao hàng nhanh
                  </label>
                  <span className="col-sm-4 p-0 text-right" name="shippingFee">
                    <NumericFormat
                      value={
                        watch("shippingType") == "Giao hàng nhanh"
                          ? watch("shippingFee")
                          : ""
                      }
                      displayType={"text"}
                      allowLeadingZeros
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </span>
                </div>
                <div className="row justify-content-between m-0 p-2 border rounded">
                  <label className="m-0" htmlFor="shipping_normal">
                    <input
                      // {...register("shippingType")}
                      className="mr-2"
                      type="radio"
                      name="shippingType"
                      id="shipping_normal"
                      checked={watch("shippingType") == "Giao thường"}
                      onChange={(e) => {
                        setValue("shippingType", "Giao thường");
                        setValue("shippingFee", 15000);
                      }}
                      // value="normal"
                    ></input>
                    Giao thường
                  </label>
                  <span className="col-sm-4 p-0 text-right" name="shippingFee">
                    <NumericFormat
                      value={
                        watch("shippingType") == "Giao thường"
                          ? watch("shippingFee")
                          : ""
                      }
                      displayType={"text"}
                      allowLeadingZeros
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </span>
                </div>
                <p className="m-0 text-danger">
                  {errors?.shippingType?.message}
                </p>
              </form>
            </div>

            <div>
              <h4 className="mt-2">Thanh toán</h4>

              <form form="form-order" name="paymentMethod">
                <div className="m-0 p-2 border rounded">
                  <label htmlFor="cod" className="m-0">
                    <input
                      // {...register("paymentMethod")}
                      type="radio"
                      className="m-0 mr-2"
                      id="cod"
                      name="paymentMethod"
                      value="COD"
                      checked={watch("paymentMethod") === "COD"}
                      onChange={(e) =>
                        setValue("paymentMethod", e.target.value)
                      }
                    />
                    Thu hộ (COD)
                  </label>
                </div>
                <div className="mt-2 p-2 border rounded">
                  <label htmlFor="online" className="m-0">
                    <input
                      // {...register("paymentMethod")}
                      type="radio"
                      className="m-0 mr-2"
                      id="online"
                      name="paymentMethod"
                      value="OnlinePayment"
                      checked={watch("paymentMethod") === "OnlinePayment"}
                      onChange={(e) =>
                        setValue("paymentMethod", e.target.value)
                      }
                    />
                    Thanh toán online
                  </label>
                </div>
                <p className="m-0 text-danger">
                  {errors?.paymentMethod?.message}
                </p>
                <div
                  className="justify-content-between mt-2 p-3 border bg-light"
                  style={
                    watch("paymentMethod") == "OnlinePayment"
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <label htmlFor="visa" className="mr-3">
                    <input
                      // {...register("transferMethod")}
                      type="radio"
                      className="m-0 mr-2"
                      id="visa"
                      name="transferMethod"
                      value={"visa"}
                      checked={watch("transferMethod") === "visa"}
                      onChange={(e) =>
                        setValue("transferMethod", e.target.value)
                      }
                    />
                    Visa
                  </label>
                  <label htmlFor="banking" className="m-0">
                    <input
                      // {...register("transferMethod")}
                      type="radio"
                      className="m-0 mr-2"
                      id="banking"
                      value="banking"
                      name="transferMethod"
                      checked={watch("transferMethod") === "banking"}
                      onChange={(e) =>
                        setValue("transferMethod", e.target.value)
                      }
                    />
                    Chuyển khoản
                  </label>
                  <p className="text-danger">
                    {errors?.transferMethod?.message}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4 bg-light border-left pr-0">
        <div>
          <h4 className="m-0 py-4">
            Đơn hàng{" "}
            <span style={{ color: "#2a9dcc" }}>
              ({props.totalItemQty} sản phẩm)
            </span>
          </h4>
          <div className="container border-top border-bottom py-3 order-summary ">
            <OrderList data={props.cart} />
          </div>
        </div>
        <div className="row m-0 py-4 border-bottom">
          <input
            className="col-sm-8 form-control"
            placeholder="Mã giảm giá"
          ></input>
          <div className="col-sm-4 p-0 text-right">
            <button className="btn btn-primary">Áp dụng</button>
          </div>
        </div>
        <div className="row mx-0 py-3">
          <p className="col-sm-6 m-0">Tạm tính</p>
          <p className="col-sm-6 m-0 text-right">
            <NumericFormat
              value={props.totalAmount}
              displayType={"text"}
              allowLeadingZeros
              thousandSeparator={true}
              suffix={"đ"}
            />
          </p>
        </div>
        <div className="row mx-0 py-3 border-bottom">
          <p className="col-sm-6 m-0">Phí vận chuyển</p>
          <p className="col-sm-6 m-0 text-right">
            <NumericFormat
              value={watch("shippingFee")}
              displayType={"text"}
              allowLeadingZeros
              thousandSeparator={true}
              suffix={"đ"}
            />
          </p>
        </div>
        <div className="row mx-0 py-3 border-bottom">
          <h4 className="col-sm-6 m-0">Tổng cộng</h4>
          <h4 className="col-sm-6 m-0 text-right" style={{ color: "#2a9dcc" }}>
            <NumericFormat
              value={props.totalAmount + Number(watch("shippingFee"))}
              displayType={"text"}
              allowLeadingZeros
              thousandSeparator={true}
              suffix={"đ"}
            />
          </h4>
        </div>
        <div className="row mx-0 py-3 justify-content-between">
          <button
            className="col-sm-6 border-0 bg-transparent m-0 p-0 text-left"
            style={{ color: "#2a9dcc" }}
            onClick={() => {
              handleBackToCart();
            }}
          >
            {"<<"} Quay về giỏ hàng
          </button>
          <div className="col-sm-6 p-0 text-right">
            <button className="btn btn-primary" form="form-order" type="submit">
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
