import React from "react";
import btn_buy from "../../image/btn-buy.png";
import { NumericFormat } from "react-number-format";
import useScrollToTop from "../../hooks/useScrollToTop";
const RenderProducts = (props) => {
  useScrollToTop();
  const renderProducts = (data, classCol) => {
    return data?.map((item) => {
      return (
        <div
          key={item.id}
          className={`${classCol} p-2 justify-content-between text-center object-fit-cover`}
          onClick={() => {
            props.handleProductDetails(item.id);
          }}
        >
          <div>
            <div className="position-relative product-block border object-fit-cover">
              <img
                src={item.productsImg[0]}
                alt=""
                className="img-fluid img"
              ></img>
              <button
                className="discount-widget"
                style={
                  item?.saleOffValue !== 0
                    ? { display: "" }
                    : { display: "none" }
                }
              >
                {Number(item?.saleOffValue) * 100}%
              </button>
              <div className="py-2 position-absolute bg-opacity w-100 bottom-0 end-0">
                <p className="m-0 text-highlight fw-bolder">
                  <NumericFormat
                    value={Number(item.productPrice)}
                    displayType={"text"}
                    allowLeadingZeros
                    thousandSeparator={true}
                    suffix={"đ"}
                  />
                </p>
                <p
                  className="m-0 text-decoration-line-through "
                  style={
                    item?.saleOffValue !== 0
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <NumericFormat
                    value={item.oldProductPrice}
                    displayType={"text"}
                    allowLeadingZeros
                    thousandSeparator={true}
                    suffix={"đ"}
                  />
                </p>
              </div>
            </div>
            <p className="m-0 mt-2">{item.productName}</p>
            <button className="border-0 mb-2 bg-transparent">
              <img src={btn_buy} className="img-fluid"></img>
            </button>
          </div>
        </div>
      );
    });
  };
  return <>{renderProducts(props.data, props.classCol)}</>;
};

export default RenderProducts;
