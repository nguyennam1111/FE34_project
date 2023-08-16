import React from "react";
import { NumericFormat } from "react-number-format";
import { Carousel } from "react-responsive-carousel";

const ShowsBestSale = (props) => {
  const index = 3;
  let newList = [];
  for (let i = 1; i <= Math.ceil(props.data.length / index); i++) {
    let start = (i - 1) * index;
    let end = i * index;

    newList?.push(props.data.slice(start, end));
  }

  const renderBestSale = (list) => {
    return (
      <div>
        {list.map((item) => {
          return (
            <div
              key={item.id}
              className="row text-center mx-2 p-2 border-bottom  product-block"
              onClick={() => {
                props.handleProductDetails(item.id);
              }}
            >
              <div className="col-md-6 border p-0 position-relative">
                <img
                  src={item?.productsImg[0]}
                  alt="vay lien than"
                  className="img-fluid img"
                ></img>
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
              <div className="col-md-6 mt-2">
                <p>{item.productName}</p>
                <p className="m-0 text-highlight">
                  <NumericFormat
                    value={Number(item.productPrice)}
                    displayType={"text"}
                    allowLeadingZeros
                    thousandSeparator={true}
                    suffix={"đ"}
                  />
                </p>
                <p
                  className="m-0 text-decoration-line-through"
                  style={
                    item?.saleOffValue === 0
                      ? { visibility: "hidden" }
                      : { display: "block" }
                  }
                >
                  <NumericFormat
                    value={Number(item.oldProductPrice)}
                    displayType={"text"}
                    allowLeadingZeros
                    thousandSeparator={true}
                    suffix={"đ"}
                  />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="border-bottom border mt-3">
      <div className="d-flex justify-content-between py-1 text-white bg-highlight">
        <h6 className="m-0 px-2 py-2 text-white">SẢN PHẨM BÁN CHẠY</h6>
      </div>
      <div>
        <Carousel
          dynamicHeight={false}
          useKeyboardArrows={true}
          autoPlay={true}
          showThumbs={false}
          infiniteLoop={true}
          interval={2000}
          stopOnHover={true}
          centerMode={true}
          centerSlidePercentage={100}
          partialVisible={true}
        >
          {newList?.map((list) => renderBestSale(list))}
        </Carousel>
      </div>
    </div>
  );
};

export default ShowsBestSale;
