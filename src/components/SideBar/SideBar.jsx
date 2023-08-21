import React, { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "./SideBarStyle.css";

import "./SideBarStyle.css";

import RenderTags from "../Product/RenderTags";
import { useDispatch, useSelector } from "react-redux";
import {
  actGetProductbyId,
  actfetchAllProducts,
} from "../../redux/feature/ProductSlice/productSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { products, productDetails } = useSelector((state) => state.product);
  const [searchParams] = useSearchParams();
  const catalog = searchParams.get("catalogue");
  const search =
    searchParams.get("search") ?? JSON.parse(localStorage.getItem("search"));

  useEffect(() => {
    dispatch(actfetchAllProducts());
  }, []);

  useEffect(() => {
    dispatch(actGetProductbyId(params.id));
  }, [params.id]);

  return (
    <>
      <div className="border m-0">
        <h5 className="p-2 bg-info text-white">DANH MỤC</h5>
        <ul className="list-unstyled p-3">
          <li>
            <Link
              to={
                search == "" || search == null
                  ? `/Products`
                  : `/Products?search=${search}`
              }
              className={`nav-link p-0 `}
              id="allProducts"
            >
              <i className="bi bi-arrow-right-circle fw-bold mx-2"></i>
              <span className="text-body">Tất cả sản phẩm</span>
            </Link>
          </li>
          <li>
            <Link
              to={
                search == "" || search == null
                  ? "/Products?catalogue=boy"
                  : `/Products?catalogue=boy&search=${search}`
              }
              className={`nav-link p-0 my-2 `}
            >
              <i className="bi bi-arrow-right-circle fw-bold mx-2"></i>
              <span className="text-body">Góc bé trai </span>
            </Link>
          </li>
          <li>
            <Link
              to={
                search == "" || search == null
                  ? "/Products?catalogue=girl"
                  : `/Products?catalogue=girl&search=${search}`
              }
              className="nav-link p-0 my-2"
            >
              <i className="bi bi-arrow-right-circle fw-bold mx-2"></i>
              <span className="text-body">Góc bé gái</span>
            </Link>
          </li>
          <li>
            <Link
              to={
                search == "" || search == null
                  ? "/Products?catalogue=accessory"
                  : `/Products?catalogue=accessory&search=${search}`
              }
              className="nav-link p-0 my-2"
            >
              <i className="bi bi-arrow-right-circle fw-bold mx-2"></i>
              <span className="text-body ">Phụ kiện</span>
            </Link>
          </li>
          <li>
            <Link
              to={
                search == "" || search == null
                  ? "/Products?status=promote"
                  : `/Products?status=promote&search=${search}`
              }
              className="nav-link p-0 my-2"
            >
              <i className="bi bi-arrow-right-circle fw-bold mx-2"></i>
              <span className="text-body">Khuyến mãi</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="border m-0">
        <h5 className="p-2 bg-info text-white">FACEBOOK</h5>
      </div>
      <div className="border m-0">
        <h5 className="p-2 bg-info text-white">TAGS</h5>
        <RenderTags data={params.id ? productDetails : ""} id={params.id} />
      </div>
    </>
  );
};

export default SideBar;
