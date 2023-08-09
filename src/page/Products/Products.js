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

const Products = (props) => {
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");
  const catalogue = searchParams.get("catalogue");
  const search = searchParams.get("search");

  const { pagination, products, filters, sortBy } = useSelector(
    (state) => state.product
  );
  const currentUrl = window.location.pathname;
  localStorage.setItem("currentUrl", JSON.stringify(currentUrl));
  useEffect(() => {
    dispatch(
      setFilters({
        ...filters,
        catalogue: catalogue,
        status: status,
        search: search,
      })
    );
  }, [search, status, catalogue]);

  useEffect(() => {
    handleChangeSort("default");
  }, [catalogue]);

  useEffect(() => {
    dispatch(
      actfetchAllProducts({
        _page: pagination.currentPage,
        _limit: pagination.pageSize,
        _sort: sortBy.sort,
        _order: sortBy.order,
        q: filters.search,
        productCatalogue: filters.catalogue,
        // productStatus: filters.status,
        productPromote: filters.status,
      })
    );
  }, [filters, sortBy, pagination.pageSize, pagination.currentPage]);

  useEffect(() => {
    dispatch(
      actfetchAllProducts({
        _page: pagination.currentPage,
        _limit: pagination.pageSize,
      })
    );

    handleChangePageSize(pagination.pageSize);
    handleChangePage(pagination.currentPage);
  }, [pagination.pageSize, pagination.currentPage]);

  useEffect(() => {
    handleChangePageSize(pagination.pageSize);
  }, [filters]);

  // useEffect(() => {
  //   dispatch(
  //     actfetchAllProducts({
  //       _page: pagination.currentPage,
  //       _limit: pagination.pageSize,
  //       _sort: sortBy.sort,
  //       _order: sortBy.order,
  //       q: filters.search,
  //       productCatalogue: filters.catalogue,
  //       productStatus: filters.status,
  //     })
  //   );
  // }, [filters, sortBy, pagination.pageSize, pagination.currentPage]);

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
        <div className="col-sm-left-6">
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
        <div className="col-sm-right-6 px-3">
          <div className="row">
            <p className="m-0 mr-2 my-auto">Sản phẩm/trang</p>
            <select
              className="form-select p-2 border"
              onChange={(e) => {
                e.preventDefault();
                handleChangePageSize(e.target.value);
              }}
            >
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
            </select>
          </div>
        </div>
      </div>
      <div className="border">
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
