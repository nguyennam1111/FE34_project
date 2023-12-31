import React, { useEffect, useState } from "react";
import "./HeaderStyle.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";

import {
  actLogin,
  logout,
  setForgotPassword,
} from "../../redux/feature/Authenticate/authSlice";
import { clearCart } from "../../redux/feature/Cart/cartSlice";
import { setEditUser } from "../../redux/feature/UserAccount/userAccountSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const catalogue = searchParams.get("catalogue");
  const pathname = window.location.pathname;
  const status = searchParams.get("status");

  const [search, setSearch] = useState(
    JSON.parse(localStorage.getItem("search")) ?? null
  );

  const { cart } = useSelector((state) => state.cart);

  const { isAuth, userProfile, isForgot } = useSelector((state) => state.auth);
  localStorage.setItem(
    "currentUrl",
    JSON.stringify(window.location.pathname + window.location.search)
  );
  const backToUrl = JSON.parse(localStorage.getItem("currentUrl"));

  const handleChangeSearch = (e) => {
    localStorage.removeItem("search");
    e.preventDefault();
    setSearch(e.target.value);

    if (e.target.value == "" || e.target.value == "null") {
      navigate(`/Products`);
    }
  };

  const handleSearch = () => {
    if (search != undefined) {
      localStorage.setItem("search", JSON.stringify(search));
      if (backToUrl === "/Home" || window.location.search == "") {
        navigate(`/Products?search=${search}`);
      } else {
        const index = backToUrl.search("search");

        index >= 0
          ? navigate(`${backToUrl.slice(0, index)}search=${search}`)
          : navigate(`${backToUrl}?search=${search}`);
      }
    }
  };

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(setForgotPassword(false));
    dispatch(setEditUser(false));
    navigate(backToUrl);
  };

  return (
    <div className="container-fluid">
      <div className="row py-2 m-0">
        <div className="col-md-5 offset-md-6 p-0 text-md-end">
          <div style={isAuth ? { display: "none" } : { display: "" }}>
            <Link
              to={ROUTES.SIGNIN}
              className="me-3 text-decoration-none"
              onClick={() => dispatch(setForgotPassword(false))}
            >
              <i className="bi bi-person-fill pe-1 border rounded-circle me-2"></i>
              Đăng nhập
            </Link>
            <Link to={ROUTES.SIGNUP} className="text-decoration-none">
              <i className="bi bi-person-plus-fill pe-1 border rounded-circle me-2 "></i>
              Đăng ký
            </Link>
          </div>
          <div className="row m-0 align-items-center text-md-end">
            <div className="col-md-8">
              <p
                className="m-0 p-0  "
                style={isAuth ? { display: "block" } : { display: "none" }}
              >
                Xin chào:
                <Link
                  className="text-primary  ps-0 text-decoration-none"
                  to={`/userAccount/${userProfile.id}`}
                >
                  {userProfile?.fullName}
                </Link>
              </p>
            </div>
            <button
              className="btn btn-outline-none m-0 col-md-3 text-danger text-start"
              onClick={() => handleSignOut()}
              style={isAuth ? { display: "block" } : { display: "none" }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
        <div className="col-md-1 my-auto fw-bold ">
          <Link to={ROUTES.CART} className="text-decoration-none">
            <i
              className={`bi bi-cart  ${
                cart?.length === 0 ? "text-danger" : "text-primary"
              }  `}
            >
              {" "}
              <span>{cart?.length == 0 ? 0 : cart?.length}</span>
            </i>
          </Link>
        </div>
      </div>

      <nav className="navbar navbar-expand-md bg-content sticky-sm-top p-2 ">
        <div className="container-fluid p-0">
          <button
            className="navbar-toggler border-white text-white p-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* Menu */}
            <span className="navbar-toggler-icon text-white p-0"></span>
          </button>
          <div
            className="collapse navbar-collapse p-0 align-items-center"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav  mb-2 mb-lg-0 text-left">
              <li className="nav-item ">
                <Link
                  to={ROUTES.HOME}
                  className="nav-link active text-white header-font "
                  aria-current="page"
                >
                  TRANG CHỦ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={ROUTES.INTRODUCE}
                  className="nav-link text-white header-font "
                >
                  GIỚI THIỆU
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-white dropdown-toggle text-white header-font"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  SẢN PHẨM
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to={
                        search == "" || search == null
                          ? `/Products`
                          : `/Products?search=${search}`
                      }
                      className={`dropdown-item bg-white text-title-normal ${
                        pathname == "/Products" &&
                        catalogue == null &&
                        status == null
                          ? `active fw-bolder text-primary`
                          : ""
                      }`}
                    >
                      TẤT CẢ SẢN PHẨM
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={
                        search == "" || search == null
                          ? "/Products?catalogue=boy"
                          : `/Products?catalogue=boy&search=${search}`
                      }
                      className={`dropdown-item bg-white text-title-normal  ${
                        catalogue == "boy"
                          ? `active fw-bolder text-primary`
                          : ""
                      }`}
                    >
                      GÓC BÉ TRAI
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={
                        search == "" || search == null
                          ? "/Products?catalogue=girl"
                          : `/Products?catalogue=girl&search=${search}`
                      }
                      className={`dropdown-item bg-white text-title-normal  ${
                        catalogue == "girl"
                          ? `active fw-bolder text-primary`
                          : ""
                      }`}
                    >
                      GÓC BÉ GÁI
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={
                        search == "" || search == null
                          ? "/Products?catalogue=accessory"
                          : `/Products?catalogue=accessory&search=${search}`
                      }
                      className={`dropdown-item bg-white text-title-normal  ${
                        catalogue == "accessory"
                          ? `active fw-bolder text-primary`
                          : ""
                      }`}
                    >
                      PHỤ KIỆN
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={
                        search == "" || search == null
                          ? "/Products?status=promote"
                          : `/Products?status=promote&search=${search}`
                      }
                      className={`dropdown-item bg-white text-title-normal  ${
                        status == "promote"
                          ? `active fw-bolder text-primary`
                          : ""
                      }`}
                    >
                      KHUYẾN MÃI
                    </Link>
                  </li>
                  <img
                    src="https://bizweb.dktcdn.net/100/117/632/themes/157694/assets/bg-cate.jpg"
                    className="img-fluid"
                  ></img>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white header-font "
                  to={ROUTES.SERVICES}
                >
                  DỊCH VỤ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white header-font "
                  to={ROUTES.NEWS}
                >
                  TIN TỨC
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white header-font  "
                  to={ROUTES.CONTACTUS}
                >
                  LIÊN HỆ
                </Link>
              </li>
            </ul>
          </div>

          <form
            className="navbar-branch d-flex justify-content-between p-0 "
            role="search"
          >
            <input
              className="form-control me-2 w-100"
              type="search"
              placeholder="Tìm kiếm"
              aria-label="Search"
              value={search}
              onChange={(e) => {
                handleChangeSearch(e);
              }}
            ></input>
            <button
              className="border-0 bg-transparent"
              type="button"
              onClick={() => {
                handleSearch();
              }}
            >
              <i className="bi bi-search text-white"></i>
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
