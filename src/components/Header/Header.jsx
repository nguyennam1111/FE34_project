import React, { useEffect, useState } from "react";
import "./HeaderStyle.css";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";

import {
  actLogin,
  logout,
  setForgotPassword,
} from "../../redux/feature/Authenticate/authSlice";
import { clearCart } from "../../redux/feature/Cart/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState();

  const { cart } = useSelector((state) => state.cart);

  const { isAuth, userProfile, isForgot } = useSelector((state) => state.auth);

  const backToUrl = JSON.parse(localStorage.getItem("currentUrl"));

  const handleSearch = () => {
    if (search != undefined) {
      navigate(`/Products?search=${search}`);
    }
  };

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(setForgotPassword(false));
    dispatch(clearCart());
    navigate(ROUTES.HOME);
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
                      to={"/Products"}
                      className="dropdown-item bg-white text-title-normal "
                    >
                      TẤT CẢ SẢN PHẨM
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Products?catalogue=boy"}
                      className="dropdown-item bg-white text-title-normal"
                    >
                      GÓC BÉ TRAI
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/Products?catalogue=girl"}
                      className="dropdown-item bg-white text-title-normal"
                    >
                      GÓC BÉ GÁI
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Products?catalogue=accessory"}
                      className="dropdown-item bg-white text-title-normal"
                    >
                      PHỤ KIỆN
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Products?status=promote"}
                      className="dropdown-item bg-white text-title-normal"
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
                e.preventDefault();
                setSearch(e.target.value);
              }}
            ></input>
            <button
              className="border-0 bg-transparent"
              type="button"
              onClick={() => handleSearch()}
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
