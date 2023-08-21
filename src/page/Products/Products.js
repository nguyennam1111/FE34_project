import React, { useEffect, useState } from "react";
import "./styleProduct.css";
import { Pagination } from "antd";
import RenderProducts from "../../components/Product/RenderProducts";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  actfetchAllProducts,
  setPageSize,
  setPage,
  sortBy,
  setFilters,
  setSort,
} from "../../redux/feature/ProductSlice/productSlice";
import useScrollToTop from "../../hooks/useScrollToTop";
import { FilterOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getValue } from "@testing-library/user-event/dist/utils";
const Products = (props) => {
  useScrollToTop();

  const callBackUrl = window.location.pathname;

  localStorage.setItem("callBackUrl", JSON.stringify(callBackUrl));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");
  const catalogue = searchParams.get("catalogue");
  const search = searchParams.get("search");

  const { pagination, products, filters, sortBy } = useSelector(
    (state) => state.product
  );

  const shemaPriceRange = Yup.object().shape({
    startPrice: Yup.string().test(
      "test start num",
      "giá bắt đầu phải lớn hơn 0",
      (value) => value >= 0
    ),
    endPrice: Yup.string().test(
      "check end price",
      "giá kết thúc không nhỏ hơn giá bắt đầu",
      (value, context) => context.parent.startPrice < value
    ),
  });

  const {
    handleSubmit: handFilterPrice,
    register,
    watch,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValue: { startPrice: "0", endPrice: "" },
    mode: "onSubmit",
    resolver: yupResolver(shemaPriceRange),
  });

  useEffect(() => {
    dispatch(
      setFilters({
        ...filters,
        catalogue: catalogue,
        status: status,
        search: search,
        startPrice: getValues("startPrice"),
        endPrice: getValues("endPrice"),
      })
    );
  }, [
    search,
    status,
    catalogue,
    getValues("startPrice"),
    getValues("endPrice"),
  ]);

  useEffect(() => {
    handleChangeSort("default");
  }, [catalogue]);

  useEffect(() => {
    if (filters.endPrice !== "") {
      dispatch(
        actfetchAllProducts({
          _page: pagination.currentPage,
          _limit: pagination.pageSize,
          _sort: sortBy.sort,
          _order: sortBy.order,

          q: filters.search,
          productCatalogue: filters.catalogue,
          productPrice_gte: filters.startPrice,
          productPrice_lte: filters.endPrice,
          productPromote: filters.status,
        })
      );
      handleChangePageSize(pagination.pageSize);
      handleChangePage(pagination.currentPage);
    } else {
      dispatch(
        actfetchAllProducts({
          _page: pagination.currentPage,
          _limit: pagination.pageSize,
          _sort: sortBy.sort,
          _order: sortBy.order,

          q: filters.search,
          productCatalogue: filters.catalogue,

          productPromote: filters.status,
        })
      );
      handleChangePageSize(pagination.pageSize);
      handleChangePage(pagination.currentPage);
    }
  }, [filters, sortBy, pagination.pageSize, pagination.currentPage]);

  // useEffect(() => {
  //   dispatch(
  //     actfetchAllProducts({
  //       _page: pagination.currentPage,
  //       _limit: pagination.pageSize,
  //     })
  //   );

  //   handleChangePageSize(pagination.pageSize);
  //   handleChangePage(pagination.currentPage);
  // }, [pagination.pageSize, pagination.currentPage]);

  // useEffect(() => {
  //   handleChangePageSize(pagination.pageSize);
  // }, [filters]);

  const handleProductDetails = (productId) => {
    navigate(`/Products/${productId}`);
  };

  const handleChangePage = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangePageSize = (newPageSize) => {
    dispatch(setPageSize(newPageSize));
    dispatch(setPage(1));
  };
  const handleChangeSort = (value) => {
    dispatch(setSort(value));
    dispatch(setPage(1));
  };

  const onValid = (data) => {
    dispatch(
      actfetchAllProducts({
        _page: pagination.currentPage,
        _limit: pagination.pageSize,
        productPrice_gte: data.startPrice,
        productPrice_lte: data.endPrice,
      })
    );
  };

  return (
    <div className="col-md-9 container-fluid" id="product-section">
      <div className="mt-3">
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">
            <a href="Home" className="text-decoration-none">
              Trang chủ
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <a>
              {searchParams.get("search") != null
                ? "Tìm kiếm"
                : catalogue === "boy"
                ? "Bé trai"
                : catalogue === "girl"
                ? "Bé gái"
                : catalogue === "accessory"
                ? "Phụ kiện"
                : status === "promote"
                ? "Khuyến mãi"
                : catalogue === null
                ? "Tất cả sản phẩm"
                : ""}
            </a>
          </li>
        </ol>
      </div>

      <h4
        className="mt-3"
        style={
          searchParams.get("search") != null
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {" "}
        Kết quả tìm kiếm cho từ khóa: {searchParams.get("search")}
      </h4>
      <div className="border bg-light mt-3">
        <div className="p-3 ">
          <form
            className="row p-0 m-0 justify-content-end"
            onSubmit={handFilterPrice(onValid)}
          >
            <div className="my-auto p-0 col-md-3 align-items-center">
              <p className="m-0 p-0">Lọc theo giá:</p>
            </div>
            <div className="d-flex col-md-4 align-items-center p-0">
              <p className="m-0 pe-1">Từ:</p>
              <input
                className="form-control"
                name="startPrice"
                {...register("startPrice")}
              ></input>
            </div>
            <div className="d-flex col-md-4 align-items-center  p-0">
              <p className="m-0 px-1">đến:</p>
              <input
                name="endPrice"
                className="form-control"
                {...register("endPrice")}
              ></input>
            </div>
            <div className="col-md-1 my-auto p-0">
              <button className="border-0 bg-transparent" type="submit">
                <FilterOutlined />
                Lọc
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row m-0 justify-content-between">
        <div className="col-md-4">
          <div className="d-flex m-0  justify-items-center mt-2">
            <p className="m-0 me-2 my-auto">Sắp xếp</p>
            <select
              className="form-select border p-2 w-50"
              onChange={(e) => {
                handleChangeSort(e.target.value);
              }}
            >
              <option value={"desc_productPrice"}>Mặc định</option>
              <option value={"asc_productPrice"}>Giá tăng dần</option>
              <option value={"desc_productPrice"}>Giá giảm dần</option>
              <option value={"asc_productName"}>Từ A-Z</option>
              <option value={"desc_productName"}>Từ Z-A</option>
              <option value={"asc_New-Old"}>Từ mới đến cũ</option>
              <option value={"desc_New-Old"}>Từ cũ đến mới</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex align-items-center justify-content-md-end m-0 p-0 mt-2">
            <p className="m-0 me-2 ">Sản phẩm/trang</p>
            <select
              className="form-select p-2 border w-25"
              onChange={(e) => {
                e.preventDefault();
                handleChangePageSize(e.target.value);
              }}
              value={pagination.pageSize}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border mt-3">
        <div className="row m-0 p-0 ">
          <RenderProducts
            data={products}
            classCol={"col-md-3"}
            handleProductDetails={handleProductDetails}
          />
        </div>
        <Pagination
          onChange={(page) => {
            handleChangePage(page);
          }}
          pageSize={pagination.pageSize}
          total={pagination.totalProducts}
          className="text-center my-3 mx-auto"
        ></Pagination>
      </div>
    </div>
  );
};

export default Products;
