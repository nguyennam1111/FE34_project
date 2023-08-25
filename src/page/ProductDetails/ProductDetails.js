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
import {
  addItemToCart,
  getOrderQtyById,
} from "../../redux/feature/Cart/cartSlice";
import useScrollToTop from "../../hooks/useScrollToTop";
import { ROUTES } from "../../constants/routes";
import ProductDescription from "../../components/Product/ProductDescription";
import { actfetchAllGuidance } from "../../redux/feature/guidance/guidanceSlice";
import { actGetAllComments } from "../../redux/feature/ProductComments/productCommentsSlice";
import RenderComments from "../../components/Product/RenderComments";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ProductDetails = () => {
  useScrollToTop();
  const callBackUrl = window.location.pathname;

  localStorage.setItem("callBackUrl", JSON.stringify(callBackUrl));

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { products, productDetails, bestSaleProducts } = useSelector(
    (state) => state.product
  );
  const { guidance } = useSelector((state) => state.guidance);
  const { isAuth, userProfile } = useSelector((state) => state.auth);

  const { productComments } = useSelector((state) => state.productComment);
  const { cart, qtyInCartById } = useSelector((state) => state.cart);

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
    dispatch(getOrderQtyById(params.id));
  }, [params.id, qtyInCartById]);

  useEffect(() => {
    dispatch(
      actfetchAllProducts({
        productName_like: productDetails.tags,
      })
    );
  }, [productDetails.tags]);

  const imageList = productDetails?.productsImg;

  const schemaAddToCart = Yup.object().shape({
    size: Yup.string().required("Chọn size"),
    color: Yup.string().required("Chọn màu"),
    inputQty: Yup.string()
      .required("Nhập số lượng cần mua")
      .test(
        "check integer",
        "Số lượng phải số nguyên",
        (value) => value % 1 === 0
      )
      .test("check min", "Số lượng phải lớn hơn 0", (value) => value > 0)
      .test(
        "checkStockQty",
        `Không đủ hàng, tối đa ${
          Number(productDetails?.stock?.totalQty) -
          Number(productDetails?.stock?.saledQty) -
          qtyInCartById
        }`,
        (value) =>
          Number(productDetails?.stock?.totalQty) -
            Number(productDetails?.stock?.saledQty) -
            qtyInCartById >=
          value
      ),
  });

  const {
    handleSubmit: handleAddProductToCart,
    register,
    watch,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    defaultValue: {
      size: "",
      color: "",
      inputQty: "1",
    },
    mode: "onSubmit",

    resolver: yupResolver(schemaAddToCart),
  });

  const handleProductDetails = (productId) => {
    navigate(`/Products/${productId}`);
  };

  const renderSize = () => {
    return productDetails.productSize?.map((size) => {
      return (
        <button
          style={{ backgroundColor: "" }}
          disabled={
            Number(productDetails?.stock?.totalQty) -
              Number(productDetails?.stock?.saledQty) -
              qtyInCartById ==
            0
          }
          type="button"
          key={size}
          className={`btn border me-2 ${
            watch("size") === size ? "bg-success text-white" : ""
          }`}
          value={size}
          onClick={(e) => {
            setValue("size", e.target.value);
          }}
        >
          {size}
        </button>
      );
    });
  };

  const renderColor = () => {
    return productDetails.productColor?.map((color) => {
      return (
        <div className="d-flex me-2">
          <button
            disabled={
              Number(productDetails?.stock?.totalQty) -
                Number(productDetails?.stock?.saledQty) -
                qtyInCartById ==
              0
            }
            type="button"
            className={`btn border ${
              watch("color") === color ? "bg-success text-white" : ""
            }`}
            value={color}
            onClick={(e) => setValue("color", e.target.value)}
          >
            {color}
          </button>
        </div>
      );
    });
  };
  const AddProductToCart = (data) => {
    dispatch(
      addItemToCart({
        product: productDetails,
        sizeAndColor: `${data.size}/${data.color}`,
        inputQty: data.inputQty,
      })
    );
    dispatch(getOrderQtyById(params.id));
    setValue("size", "");
    setValue("color", "");
    setValue("inputQty", "");
  };

  return (
    <>
      <div>
        <div className="row m-0">
          <div className="col-md-5">
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
          <div className="col-md-7">
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
                value={productDetails?.oldProductPrice}
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
            <p>
              Giá:{" "}
              <NumericFormat
                value={Number(productDetails?.productPrice)}
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
                className="text-highlight font-price "
              />
            </p>
            <p className="bg-highlight text-white font-instock px-2">
              {Number(productDetails?.stock?.totalQty) -
                Number(productDetails?.stock?.saledQty) -
                qtyInCartById !=
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
              <form
                onSubmit={handleAddProductToCart(AddProductToCart)}
                disabled={
                  Number(productDetails?.stock?.totalQty) -
                    Number(productDetails?.stock?.saledQty) -
                    qtyInCartById ==
                  0
                }
              >
                <div className="d-flex mt-3" {...register("size")}>
                  <p className="me-2">Chọn size: </p>

                  {renderSize()}
                </div>
                <p className="text-danger">{errors?.size?.message}</p>
                <div className="d-flex mt-3" {...register("color")}>
                  <p className="me-2">Chọn màu: </p>

                  {renderColor()}
                </div>

                <p className="text-danger">{errors?.color?.message}</p>
                <div {...register("inputQty")}>
                  <div className="d-flex mt-3">
                    <input
                      id="inputQty"
                      name="inputQty"
                      type="number"
                      className="form-control w-25"
                      onChange={(e) => setValue("inputQty", e.target.value)}
                      disabled={
                        Number(productDetails?.stock?.totalQty) -
                          Number(productDetails?.stock?.saledQty) -
                          qtyInCartById ==
                        0
                      }
                    ></input>

                    <button
                      className="btn btn-primary mx-2 text-white"
                      type="submit"
                      disabled={
                        Number(productDetails?.stock?.totalQty) -
                          Number(productDetails?.stock?.saledQty) -
                          qtyInCartById ==
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
                  <p className="text-danger" id="text-warning-Qty">
                    {errors?.inputQty?.message}
                  </p>
                </div>
              </form>
              <p className="mt-3">Gọi ngay để được tư vấn</p>
              <h5 className="col-md-6 p-3 bg-highlight text-center text-white">
                HOTLINE: 0905150109
              </h5>
              <div className="mt-2 ">
                <img
                  src="https://bizweb.dktcdn.net/100/117/632/themes/157694/assets/icon-dt.jpg?1564585558451"
                  alt="Gao Hàng toàn quốc-Đổi trả trong vòng 48 giờ"
                  className="object-fit-cover align-content-center w-100"
                ></img>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 m-0">
          <div className="col-md-8 fixed-content " id="productDetail-leftSide">
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

          <div className="col-md-4" id="productDetail-rightSide">
            <SideBar />
            <ShowsBestSale
              data={bestSaleProducts}
              handleProductDetails={handleProductDetails}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 border-top">
        <h4 className="text-title-normal ps-3 py-2 m-0">SẢN PHẨM LIÊN QUAN</h4>

        <div className="row m-0 p-3">
          <RenderProducts
            data={products}
            classCol="col-md-2"
            handleProductDetails={handleProductDetails}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
