import React from "react";
import btn_buy from "../../image/btn-buy.png";
import { NumericFormat } from "react-number-format";
const RenderProducts = (props) => {
  const renderProducts = (data, classCol) => {
    return data?.map((item) => {
      return (
        <div
          key={item.id}
          className={`${classCol} g-2 pt-2 justify-content-between text-center`}
          onClick={() => {
            props.handleProductDetails(item.id);
          }}
        >
          <div className="border">
            <div className="position-relative  product-block">
              <img src={item.productsImg[0]} alt="" className="img"></img>
              <button
                className="discount-widget"
                style={
                  item?.saleOffValue !== 0
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                {Number(item?.saleOffValue) * 100}%
              </button>
            </div>
            <p className="m-0 text-highlight ">
              <NumericFormat
                value={
                  Number(item.productPrice) -
                  Number(item.productPrice) * Number(item?.saleOffValue)
                }
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
            <p
              className="m-0 text-line-through "
              style={
                item?.saleOffValue !== 0
                  ? { display: "block" }
                  : { visibility: "hidden" }
              }
            >
              <NumericFormat
                value={item.productPrice}
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
          </div>
          <p className="m-0 py-3 ">{item.productName}</p>
          <button className="border-0 mb-2 bg-transparent">
            <img src={btn_buy} className="img-fluid"></img>
          </button>
        </div>
      );
    });
  };
  return <>{renderProducts(props.data, props.classCol)}</>;
};

export default RenderProducts;
