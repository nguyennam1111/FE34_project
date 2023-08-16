import React, { useEffect, useState } from "react";
import "./homeStyle.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ShowBestSale from "../../components/Product/ShowBestSale";
import Banner from "../../components/Banner/Banner";
import ShowHotProducts from "../../components/Product/ShowHotProducts";
import { useDispatch, useSelector } from "react-redux";
import ShowLogos from "../../components/ShowLogos/ShowLogos";
import {
  actGetProductByStatus,
  actUpdateProductPrice,
  actUpdateProductStatus,
  actUpdateSaleStatus,
  actUpdateStatus,
  actfetchAllProducts,
  setFilters,
} from "../../redux/feature/ProductSlice/productSlice";
import ShowNewProducts from "../../components/Product/ShowNewProducts";
import GuidanceAndPolicy from "../../components/GuidanceAndPolicy/GuidanceAndPolicy";
import { actfetchAllLogos } from "../../redux/feature/LogoSlice/logoSlice";
import { actfetchAllBanners } from "../../redux/feature/Banner/bannerSlice";
import { actfetchAllGuidance } from "../../redux/feature/guidance/guidanceSlice";
import { actGetAllSaleStatus } from "../../redux/feature/SaleStatusSlice/saleStatusSlice";

const Home = () => {
  const callBackUrl = window.location.pathname;

  localStorage.setItem("callBackUrl", JSON.stringify(callBackUrl));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, filters, newProducts, bestSaleProducts, hotProducts } =
    useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.orders);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const catalogue = searchParams.get("catalogue");

  const status = searchParams.get("status");

  const { logos } = useSelector((state) => state.logo);
  const { banners } = useSelector((state) => state.banner);
  const { guidance } = useSelector((state) => state.guidance);
  const { isAuth } = useSelector((state) => state.auth);
  const { saleStatus } = useSelector((state) => state.saleStatus);

  // useEffect(() => {
  //   products?.map((item) => {
  //     const newPrice =
  //       item.oldProductPrice - item.oldProductPrice * item.saleOffValue;
  //     saleStatus?.map((saleItem) => {
  //       if (saleItem.productId == item.id) {
  //         dispatch(
  //           actUpdateProductStatus({
  //             updateId: item.id,
  //             updateSaleStatus: {
  //               productStatus: saleItem.productStatus,
  //               productPromote: saleItem.productPromote,
  //               saleOffValue: saleItem.saleOffValue,
  //             },
  //           })
  //         );
  //       }
  //     });
  //     dispatch(
  //       actUpdateProductPrice({
  //         updateId: item.id,
  //         updatePrice: { productPrice: newPrice },
  //       })
  //     );
  //   });
  // }, [products]);

  useEffect(() => {
    dispatch(actfetchAllLogos());
    dispatch(actfetchAllProducts());
    dispatch(actfetchAllBanners());
    dispatch(actfetchAllGuidance());
    dispatch(actGetAllSaleStatus());
    products?.map((item) => {
      const newPrice =
        item.oldProductPrice - item.oldProductPrice * item.saleOffValue;
      saleStatus?.map((saleItem) => {
        if (saleItem.productId == item.id) {
          dispatch(
            actUpdateProductStatus({
              updateId: item.id,
              updateSaleStatus: {
                productStatus: saleItem.productStatus,
                productPromote: saleItem.productPromote,
                saleOffValue: saleItem.saleOffValue,
              },
            })
          );
        }
      });
      dispatch(
        actUpdateProductPrice({
          updateId: item.id,
          updatePrice: { productPrice: newPrice },
        })
      );
    });
  }, []);

  useEffect(() => {
    dispatch(
      setFilters({
        ...filters,
        q: search,
      })
    );
  }, [search]);

  useEffect(() => {
    dispatch(
      actfetchAllProducts({
        q: filters.search,
      })
    );
  }, [filters]);

  const handleProductDetails = (productId) => {
    navigate(`/Products/${productId}`);
  };

  const handlePrevButton = () => {
    return true;
  };
  return (
    <div className="m-0 container-fluid">
      <Banner data={banners} />
      <div className="row m-0 mt-2">
        <div className="col-md-3 p-2 ">
          <ShowLogos data={logos} />

          <ShowBestSale
            data={bestSaleProducts}
            handleProductDetails={handleProductDetails}
            handlePrevButton={handlePrevButton}
          />
          <div className="text-white text-center  mt-2 bg-highlight">
            <h3 className="border-bottom mx-5 py-3 text-white">HOTLINE</h3>
            <h3 className="py-3 text-white">090.515.0109</h3>
          </div>
        </div>
        <div className="col-md-9 mt-2 text-center">
          <ShowHotProducts
            data={hotProducts}
            classCol={"col-sm-4"}
            handleProductDetails={handleProductDetails}
          />
          <ShowNewProducts
            data={
              catalogue == null
                ? newProducts
                : newProducts.filter(
                    (item) => item.productCatalogue === catalogue
                  )
            }
            classCol={"col-sm-3"}
            handleProductDetails={handleProductDetails}
          />
          <div className="m-0 mt-2">
            <img
              className="img-fluid"
              src="https://bizweb.dktcdn.net/100/117/632/themes/157694/assets/banner1.gif?1564585558451"
            ></img>
          </div>
        </div>
      </div>
      <GuidanceAndPolicy data={guidance} />
    </div>
  );
};

export default Home;
