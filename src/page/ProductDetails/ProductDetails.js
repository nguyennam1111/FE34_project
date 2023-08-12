import React, { useEffect, useState } from "react";
import "./styleProductDetail.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Carousel } from "react-responsive-carousel";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  actAddProductComment,
  actfetchAllProducts,
  actGetProductbyId,
  actGetProductByStatus,
} from "../../redux/feature/ProductSlice/productSlice";
import { NumericFormat } from "react-number-format";
import SideBar from "../../components/SideBar/SideBar";
import ShowsBestSale from "../../components/Product/ShowBestSale";
import RenderProducts from "../../components/Product/RenderProducts";
import { addItemToCart } from "../../redux/feature/Cart/cartSlice";
import useScrollToTop from "../../hooks/useScrollToTop";
import { ROUTES } from "../../constants/routes";
import ProductDescription from "../../components/Product/ProductDescription";
import { actfetchAllGuidance } from "../../redux/feature/guidance/guidanceSlice";
import {
  actAddComment,
  actGetAllComments,
  actGetCommentDetails,
} from "../../redux/feature/ProductComments/productCommentsSlice";
import RenderComments from "../../components/Product/RenderComments";

const ProductDetails = () => {
  useScrollToTop();
  const callBackUrl = window.location.pathname;

  localStorage.setItem("callBackUrl", JSON.stringify(callBackUrl));

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputQty, setInputQty] = useState("1");
  const [sizeAndColor, setSizeAndColor] = useState();
  let { products, productDetails, bestSaleProducts } = useSelector(
    (state) => state.product
  );
  const { guidance } = useSelector((state) => state.guidance);
  const { isAuth, userProfile } = useSelector((state) => state.auth);

  const { productComments } = useSelector((state) => state.productComment);
  const { cart } = useSelector((state) => state.cart);
  const _productQtyInCart = cart.filter?.((item) =>
    item.productId == productDetails.id && sizeAndColor == item.sizeAndColor
      ? item.productQty
      : 0
  );
  console.log(_productQtyInCart, "productQtyInCart");

  useEffect(() => {
    dispatch(actfetchAllProducts());
    dispatch(actfetchAllGuidance());
    dispatch(actGetProductbyId(params.id));
    dispatch(
      actGetAllComments({
        productId: params.id,
      })
    );
  }, [params.id]);

  useEffect(() => {
    dispatch(
      actfetchAllProducts({
        productName_like: productDetails.tags,
      })
    );
  }, [productDetails.tags]);

  const imageList = productDetails?.productsImg;

  const handleProductDetails = (productId) => {
    navigate(`/Products/${productId}`);
  };
  const handleInputChange = (e) => {
    setInputQty(e.target.value);
  };

  const handleSelectSizeAndColor = (e) => {
    setSizeAndColor(e);
  };

  const handleAddProductToCart = () => {
    if (
      !isNaN(inputQty) &&
      inputQty > 0 &&
      inputQty !== "" &&
      parseFloat(inputQty) % 1 === 0
    ) {
      document.getElementById("text-warning-Qty").textContent = "";
      if (sizeAndColor != undefined) {
        document.getElementById(
          "selectSizeAndColor"
        ).nextElementSibling.textContent = "";

        dispatch(
          addItemToCart({
            product: productDetails,
            sizeAndColor: sizeAndColor,
            inputQty: inputQty,
          })
        );

        setInputQty("");
      } else {
        document.getElementById(
          "selectSizeAndColor"
        ).nextElementSibling.textContent = "Chọn size và màu";
      }
    } else {
      document.getElementById("text-warning-Qty").textContent =
        "Vui lòng nhập số lượng cần mua";
    }
  };

  const renderSelectDetails = (data) => {
    return productDetails?.productSize?.map((ele) => {
      return data?.map((item) => {
        return (
          <option value={`${ele}/${item}`}>
            {ele}/{item}
          </option>
        );
      });
    });
  };

  return (
    <>
      <div>
        <div className="row m-0">
          <div className="col-sm-5">
            <Carousel
              useKeyboardArrows={true}
              autoPlay={true}
              showThumbs={true}
              infiniteLoop={true}
              interval={2000}
              stopOnHover={true}
            >
              {imageList?.map((item, index) => (
                <div className="position-relative" key={index}>
                  <img className="img-fluid border" src={item}></img>
                  <button
                    className="discount-widget"
                    style={
                      productDetails?.saleOffValue !== 0
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {Number(productDetails?.saleOffValue) * 100}%
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="col-sm-7">
            <h4>{productDetails?.productName}</h4>
            <p
              style={
                productDetails?.saleOffValue != 0
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              Giá gốc:{" "}
              <NumericFormat
                value={productDetails?.productPrice}
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
            <p>
              Giá:{" "}
              <NumericFormat
                value={
                  Number(productDetails?.productPrice) -
                  Number(productDetails?.productPrice) *
                    Number(productDetails?.saleOffValue)
                }
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
                className="text-highlight font-price "
              />
            </p>
            <p className="bg-highlight text-white font-instock px-2">
              {Number(productDetails?.stock?.totalQty) -
                Number(productDetails?.stock?.saledQty) !==
              0
                ? "Còn hàng"
                : "Hết hàng"}
            </p>
            <p>
              <span style={{ fontWeight: 600 }}>Mã Sản phẩm:</span>{" "}
              {productDetails?.productCode}
            </p>
            <p>
              {" "}
              <span style={{ fontWeight: 600 }}>Thương Hiệu:</span>
              {productDetails?.productBranch}
            </p>
            <p>
              Sản phẩm có{" "}
              {Object.values(productDetails?.productSize || {}).length} size, và{" "}
              {Object.values(productDetails?.productColor || {}).length} màu để
              lựa chọn.
            </p>
            <p>{productDetails.productDescription?.title}</p>
            <div>
              <select
                name={productDetails?.productCode}
                id="selectSizeAndColor"
                className="form-control w-50"
                defaultValue=""
                value={sizeAndColor}
                onChange={(e) => {
                  handleSelectSizeAndColor(e.target.value);
                }}
                disabled={
                  Number(productDetails?.stock?.totalQty) -
                    Number(productDetails?.stock?.saledQty) ===
                  0
                }
              >
                <option>Chọn size và màu</option>
                {renderSelectDetails(productDetails?.productColor)}
              </select>
              <p className="text-danger"></p>
              <div>
                <div className="d-flex mt-3">
                  <input
                    id="inputQty"
                    name="inputQty"
                    type="number"
                    max={`${
                      Number(productDetails?.stock?.totalQty) -
                      Number(productDetails?.stock?.saledQty)
                    }`}
                    className="form-control w-25"
                    defaultValue="1"
                    value={inputQty}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    disabled={
                      Number(productDetails?.stock?.totalQty) -
                        Number(productDetails?.stock?.saledQty) ===
                      0
                    }
                  ></input>

                  <button
                    className="btn bg-content mx-2"
                    onClick={() => {
                      handleAddProductToCart();
                    }}
                    disabled={
                      Number(productDetails?.stock?.totalQty) -
                        Number(productDetails?.stock?.saledQty) ===
                      0
                    }
                  >
                    Đặt Hàng
                  </button>
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </div>
                <p className="text-danger" id="text-warning-Qty"></p>
              </div>
              <p className="mt-3">Gọi ngay để được tư vấn</p>
              <h5 className="p-3 bg-highlight text-center text-white w-sm-50">
                HOTLINE: 0905150109
              </h5>
              <div>
                <img
                  src="https://bizweb.dktcdn.net/100/117/632/themes/157694/assets/icon-dt.jpg?1564585558451"
                  alt="Gao Hàng toàn quốc-Đổi trả trong vòng 48 giờ"
                  className="mt-2 img-fluid"
                ></img>
              </div>
            </div>
          </div>
        </div>

        <div className="row m-0">
          <div className="col-sm-8 fixed-content position-relative ">
            <ProductDescription
              productDetails={productDetails}
              data={guidance}
            />

            <div className="mt-3">
              <RenderComments
                productComments={productComments}
                productDetails={productDetails}
                userProfile={userProfile}
                isAuth={isAuth}
                id={params.id}
              />
            </div>
          </div>

          <div className="col-sm-4">
            <SideBar />
            <ShowsBestSale
              data={bestSaleProducts}
              handleProductDetails={handleProductDetails}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 border-top">
        <h4 className="text-title-normal pl-3 py-2 m-0">SẢN PHẨM LIÊN QUAN</h4>

        <div
          className="row m-0"
          style={{ maxHeight: 400, height: "100%", overflowY: "scroll" }}
        >
          <RenderProducts
            data={products}
            classCol="col-sm-2"
            handleProductDetails={handleProductDetails}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
