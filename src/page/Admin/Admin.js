import React from "react";
import { useState } from "react";
import ShowProductsByAdmin from "../../components/Admin/AdminProducts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actfetchAllProducts } from "../../redux/feature/ProductSlice/productSlice";
import { actGetAllSaleStatus } from "../../redux/feature/SaleStatusSlice/saleStatusSlice";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import AdminDashBoard from "../../components/Admin/AdminDashBoard";

const Admin = () => {
  const { products } = useSelector((state) => state.product);
  const { saleStatus } = useSelector((state) => state.saleStatus);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const branch = searchParams.get("branch");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(actfetchAllProducts());
    dispatch(actGetAllSaleStatus());
  }, []);
  switch (branch) {
    case "products":
      return <ShowProductsByAdmin products={products} />;
      break;

    default:
      return <AdminDashBoard products={products} />;
      break;
  }
};

export default Admin;
