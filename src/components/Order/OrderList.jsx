import React from "react";
import { NumericFormat } from "react-number-format";

const OrderList = (props) => {
  const renderOrderList = (data) => {
    return data?.map((item) => {
      return (
        <div key={item?.index && item?.productName} className="row m-0 py-2">
          <div className="col-md-2 col-sm-2 bg-white position-relative p-0 orderList ">
            <img
              src={item?.productImg}
              className="img-fluid object-fit-cover order-summary-img"
            ></img>

            <button className="border-0 order-summary-itemQty m-auto p-0">
              {item?.productQty}
            </button>
          </div>
          <div className="col-md-7 col-sm-7 p-0 px-2 m-0">
            <p className=" m-0">{item?.productName}</p>
            <p className="m-0" style={{ color: "#96A3C0" }}>
              {item?.sizeAndColor}
            </p>
          </div>
          <p className="col-md-3 col-sm-3 m-0 p-0 text-md-end">
            <NumericFormat
              value={item?.productAmount}
              displayType={"text"}
              allowLeadingZeros
              thousandSeparator={true}
              suffix={"đ"}
            />
          </p>
        </div>
      );
    });
  };
  return <div className="bg-light">{renderOrderList(props.data)}</div>;
};

export default OrderList;
