import React from "react";
import "../../App.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import btn_buy from "../../image/btn-buy.png";
import { NumericFormat } from "react-number-format";
// import "../../page/Home/homeStyle.css";
const CarouselShow = (data) => {
  return (
    <Carousel
      useKeyboardArrows={true}
      autoPlay={true}
      showThumbs={true}
      infiniteLoop={true}
      interval={2000}
      stopOnHover={true}
    >
      {data.map((item, index) => (
        <div className="position-relative" key={index}>
          <img className="img-fluid border" src={item.productsImg[0]}></img>

          <button
            className="discount-widget"
            style={
              item.productStatus[0].saleOffValue !== 0
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {Number(item.productStatus[0].saleOffValue) * 100}%
          </button>

          <div
            className="position-absolute bg-light"
            style={{
              width: "100%",
              bottom: 10,
              left: 0,
            }}
          >
            <p className="m-0 text-highlight">
              <NumericFormat
                value={
                  item.productStatus[0].saleOffValue === 0
                    ? item.productPrice
                    : item.productPrice -
                      item.productPrice * item.productStatus[0].saleOffValue
                }
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
            <p
              className="m-0 text-line-through"
              style={
                item.productStatus[0].saleOffValue !== 0
                  ? { display: "block" }
                  : { display: "none" }
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
            <p className=" m-0 ">{item.productName}</p>
            <button className="border-0 bg-transparent">
              <img src={btn_buy}></img>
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselShow;
