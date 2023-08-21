import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  changeCartItemQty,
  deleteCartItem,
  getAllCartItem,
  setCartItemQty,
  setCartQty,
  updateCartValue,
} from "../../redux/feature/Cart/cartSlice";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constants/routes";

const Cart = () => {
  const callBackUrl = window.location.pathname;

  localStorage.setItem("callBackUrl", JSON.stringify(callBackUrl));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, totalAmount } = useSelector((state) => state.cart);

  const handleRemoveCartItem = (id) => {
    dispatch(deleteCartItem(id));
  };

  const handleProductDetails = (productId) => {
    navigate(`/Products/${productId}`);
  };
  const handlePayment = () => {
    if (cart.length !== 0) {
      navigate(ROUTES.PAYMENT);
    }
  };
  const handleChangeCartItemQty = (value, id) => {
    dispatch(setCartItemQty({ id: id, value: value }));
  };

  const handleUpdateCartItemQty = () => {
    dispatch(updateCartValue());
  };

  const renderCartItems = (data) => {
    return data?.map((item) => {
      return (
        <tr key={item.id && item.sizeAndColor} className="text-center">
          <td className="align-middle">{item.productCode}</td>
          <td className=" align-middle p-0 ">
            <img
              src={item.productImg}
              className="img-fluid img p-0 product-block"
              onClick={() => {
                handleProductDetails(item.productId);
              }}
            ></img>
          </td>
          <td className="align-middle">{item.productName}</td>
          <td className="align-middle">{item.sizeAndColor}</td>
          <td className="align-middle">
            {" "}
            <NumericFormat
              value={Number(item.productPrice)}
              displayType={"text"}
              allowLeadingZeros
              thousandSeparator={true}
              suffix={"đ"}
            ></NumericFormat>
          </td>
          <td className="align-middle">
            <input
              type="number"
              placeholder="0"
              className="text-center text-center p-0 m-auto border"
              style={{ maxWidth: 100, width: "100%" }}
              min={0}
              value={item.productQty}
              onChange={(e) => {
                handleChangeCartItemQty(e.target.value, item.id);
              }}
            ></input>
          </td>
          <td className="align-middle">
            <NumericFormat
              value={Number(item.productAmount)}
              displayType={"text"}
              allowLeadingZeros
              thousandSeparator={true}
              suffix={"đ"}
            ></NumericFormat>
          </td>
          <td className="align-middle">
            <button
              className="border-0 bg-transparent"
              onClick={() => {
                handleRemoveCartItem(item.id);
              }}
            >
              <i className="bi bi-trash text-danger"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container-fluid mt-3">
      <form className=" form-control overflow-x-scroll">
        <table className="table table-bordered table-responsive-md align-middle">
          <thead className="sticky-sm-top">
            <tr className="text-center">
              <th>MÃ SẢN PHẨM</th>
              <th>HÌNH ẢNH</th>
              <th>SẢN PHẨM</th>
              <th>Size/Màu</th>
              <th>ĐƠN GIÁ</th>
              <th>SỐ LƯỢNG</th>
              <th>THÀNH TIỀN</th>
              <th>XÓA</th>
            </tr>
          </thead>
          <tbody
            style={{
              maxHeight: 100,
              height: "100%",
              overflowY: "scroll",
            }}
          >
            {renderCartItems(cart)}
          </tbody>
        </table>
      </form>
      <div className="row mt-2 align-items-center">
        <div className="col-md-9 order-ms-2 order-2 text-left">
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => {
              navigate(ROUTES.HOME);
            }}
          >
            MUA HÀNG TIẾP
          </button>
          <button
            className="btn btn-warning btn-sm"
            type="button"
            onClick={() => handleUpdateCartItemQty()}
          >
            CẬP NHẬT
          </button>
        </div>
        <form className="col-md-3 text-start order-1 order-md-2">
          <table className="table table-bordered mt-2 ">
            <tbody>
              <tr>
                <td>Tổng tiền</td>
                <td className="text-end">
                  <NumericFormat
                    value={totalAmount}
                    displayType={"text"}
                    allowLeadingZeros
                    thousandSeparator={true}
                    suffix={"đ"}
                  ></NumericFormat>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className="text-end mt-2">
        <button
          className={` btn ${
            cart.length === 0 ? "btn-secondary" : "btn-primary"
          } `}
          disabled={cart.length == 0 ? true : false}
          onClick={() => {
            handlePayment();
          }}
        >
          THANH TOÁN
        </button>
      </div>
    </div>
  );
};

export default Cart;
