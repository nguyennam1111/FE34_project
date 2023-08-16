import React, { useEffect, useState } from "react";
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
    <div className="col-sm-9 container">
      <div>
        <div>
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item">
              <a href="Home">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active">
              <a className="active">
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
      <div className="row p-3 m-0 justify-content-between">
        <div className="col-sm-left-4">
          <div className="row m-0  justify-items-center">
            <p className="m-0 mr-2 my-auto">Sắp xếp</p>
            <select
              className="form-select border p-2"
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

        <div className="col-sm-right-4 px-3">
          <div className="row">
            <p className="m-0 mr-2 my-auto">Sản phẩm/trang</p>
            <select
              className="form-select p-2 border"
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
      <div className="px-3">
        <form className="row p-0 m-0" onSubmit={handFilterPrice(onValid)}>
          <div className="my-auto p-0 col-sm-2 align-items-center">
            <p className="m-0 p-0">Lọc theo giá:</p>
          </div>
          <div className="d-flex col-sm-4 w-75 align-items-center p-0">
            <p className="m-0 pr-1">Từ:</p>
            <input
              className="form-control"
              name="startPrice"
              {...register("startPrice")}
            ></input>
          </div>
          <div className="d-flex col-sm-4 align-items-center w-75 p-0">
            <p className="m-0 px-1">đến:</p>
            <input
              name="endPrice"
              className="form-control"
              {...register("endPrice")}
            ></input>
          </div>
          <div className="col-sm-2 align-items-center align-middle">
            <button className="border-0 bg-transparent" type="submit">
              <FilterOutlined />
              Lọc
            </button>
          </div>
        </form>
      </div>
      <div className="border mt-3">
        <div className="row m-0 p-0 ">
          <RenderProducts
            data={products}
            classCol={"col-sm-3"}
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
