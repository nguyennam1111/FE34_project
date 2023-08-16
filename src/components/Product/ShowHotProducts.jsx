import React from "react";

import CarouselShow from "../CarouselShow/CarouselShow";
import { Carousel } from "react-responsive-carousel";
import { NumericFormat } from "react-number-format";
import btn_buy from "../../image/btn-buy.png";
import RenderProducts from "../Product/RenderProducts";
import { useNavigate } from "react-router";
const ShowHotProducts = (props) => {
  const navigate = useNavigate();
  const handleAllProducts = () => {
    navigate(`/Products`);
  };

  const renderHotProducts = (data, classCol) => {
    return (
      <div className="mt-2 ">
        <h5 className="text-left text-title-normal">SẢN PHẨM NỔI BẬT</h5>
        <div className="row m-0">
          <div className="col-md-4 border p-2">
            <Carousel
              useKeyboardArrows={true}
              autoPlay={true}
              showThumbs={true}
              infiniteLoop={true}
              interval={2000}
              stopOnHover={true}
            >
              {data.map((item, index) => (
                <div
                  className="position-relative"
                  key={index}
                  onClick={() => {
                    props.handleProductDetails(item.id);
                  }}
                >
                  <img
                    className="img-fluid border"
                    src={item.productsImg[0]}
                  ></img>

                  <button
                    className="discount-widget"
                    style={
                      item.saleOffValue !== 0
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {Number(item.saleOffValue) * 100}%
                  </button>

                  <div
                    className="position-absolute bg-opacity"
                    style={{
                      width: "100%",
                      bottom: 10,
                      left: 0,
                    }}
                  >
                    <p className="m-0 text-highlight">
                      <NumericFormat
                        value={
                          item.saleOffValue === 0
                            ? item.oldProductPrice
                            : item.productPrice
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
                        item.saleOffValue !== 0
                          ? { display: "block" }
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
                    <p className="m-0" style={{ fontSize: 25 }}>
                      {item.productName}
                    </p>
                    <button className="border-0 bg-transparent">
                      <img src={btn_buy}></img>
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="col-md-8 border pb-3 overflow-y-scroll">
            <div className="row p-2 ">
              <RenderProducts
                data={data}
                classCol={classCol}
                handleProductDetails={props.handleProductDetails}
              />
            </div>
            <div className=" mx-auto my-3 p-1 bg-content w-75">
              <button
                className="m-0 w-100 py-3 text-center text-white border-white bg-content"
                onClick={() => {
                  handleAllProducts();
                }}
              >
                XEM TOÀN BỘ SẢN PHẨM{" "}
                <span>
                  <i className="bi bi-arrow-right-circle"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return <>{renderHotProducts(props.data, props.classCol)}</>;
};

export default ShowHotProducts;
