import React from "react";
import { NumericFormat } from "react-number-format";
import OrderList from "./OrderList";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckCircleOutlined, PrinterOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ShowOrderSucceed = (props) => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid px-4 bg-light">
      <div>
        <h4 className="mt-4 text-title-normal">KidShop</h4>
      </div>
      <div className="row mt-3">
        <div className="col-md-7">
          <div className="row m-0">
            <div className="col-md-2">
              <CheckCircleOutlined
                className="text-success"
                style={{ fontSize: 70 }}
              />
            </div>
            <div className="col-md-6">
              <h5>cảm ơn bạn đã đặt hàng</h5>
              <p>
                Một email xác nhận đã được gởi tới email
                <a className="text-primary">{props.orderSucceed?.orderEmail}</a>
                . Xin vui lòng kiểm tra email
              </p>
            </div>
          </div>
          <div className="row m-0 border">
            <div className="col-md-6">
              <div>
                <h4>Thông tin mua hàng</h4>
                <p>Tên:{props.orderSucceed?.fullName}</p>

                <p>Điệnthoại:{props.orderSucceed?.phone}</p>
                <p>Email:{props.orderSucceed?.orderEmail}</p>
              </div>
              <div>
                <h4>Phương thức thanh toán</h4>
                <p>
                  {props.orderSucceed?.paymentMethod}/
                  {props.orderSucceed?.transferMethod}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <h4>Địa chỉ nhận hàng</h4>
                <p>Địa chỉ:{props.orderSucceed?.address}</p>
                <p>Tỉnh:{props.orderSucceed?.province}</p>
                <p>Quận/Huyện:{props.orderSucceed?.district}</p>

                <p>Phường/Xã:{props.orderSucceed?.ward}</p>
              </div>
              <div>
                <h4>Phương thức vận chuyển</h4>
                <p>{props.orderSucceed?.shippingType}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div>
            <h5 className="m-0">
              Đơn hàng: {props.orderSucceed?.orderCode}
              <span style={{ color: "#2a9dcc" }}>
                ({props.orderSucceed?.totalItemQty} sản phẩm)
              </span>
            </h5>
            <div className="container border-top border-bottom py-3 order-summary ">
              <OrderList data={props.orderSucceed?.orderList} />
            </div>
          </div>

          <div className="row mx-0 py-1">
            <p className="col-md-6 m-0">Tạm tính</p>
            <p className="col-md-6 m-0 text-right">
              <NumericFormat
                value={props.orderSucceed?.totalAmount}
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
          </div>
          <div className="row mx-0 py-1 border-bottom">
            <p className="col-md-6 m-0">Phí vận chuyển</p>
            <p className="col-md-6 m-0 text-right">
              <NumericFormat
                value={props.orderSucceed?.shippingFee}
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
          </div>
          <div className="row mx-0 py-2 border-bottom">
            <h4 className="col-md-6 m-0">Tổng cộng</h4>
            <h4
              className="col-md-6 m-0 text-right"
              style={{ color: "#2a9dcc" }}
            >
              <NumericFormat
                value={
                  Number(props.orderSucceed?.totalAmount) +
                  Number(props.orderSucceed?.shippingFee)
                }
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
              />
            </h4>
          </div>
        </div>
      </div>
      <div className="">
        <div className="col-md-6 m-0 my-3 text-center align-middle">
          <button
            className=" btn btn-primary mr-4"
            onClick={() => navigate(ROUTES.HOME)}
          >
            Tiếp tục mua hàng
          </button>
          <button
            onClick={() => window.print()}
            className="btn border-0 bg-transparent"
          >
            <PrinterOutlined style={{ color: "#2A9DCC", fontSize: 20 }} /> In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderSucceed;
