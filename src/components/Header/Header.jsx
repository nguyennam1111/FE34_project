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

import { logout } from "../../redux/feature/Authenticate/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState();

  const { cart } = useSelector((state) => state.cart);

  const { isAuth, userProfile } = useSelector((state) => state.auth);

  const handleSearch = () => {
    if (search != undefined) {
      navigate(`/Products?search=${search}`);
    }
  };

  const handleSignOut = () => {
    dispatch(logout());
  };
  return (
    <div className="container-fluid">
      <div className="row py-2 m-0">
        <div className="col-md-4 offset-md-7 text-center p-0">
          <div style={isAuth ? { display: "none" } : { display: "block" }}>
            <Link to={ROUTES.SIGNIN} className="mr-3">
              <i className="bi bi-person-fill pr-1 border rounded-circle"></i>
              Đăng nhập
            </Link>
            <Link to={ROUTES.SIGNUP}>
              <i className="bi bi-person-plus-fill pr-1 border rounded-circle"></i>
              Đăng ký
            </Link>
          </div>
          <div className="row m-0 ">
            <p
              className="m-0 p-0"
              style={isAuth ? { display: "block" } : { display: "none" }}
            >
              Xin chào:{" "}
              <span
                className="text-primary col-md-9 pl-0 header-userAcc"
                onClick={() => navigate(`/userAccount/${userProfile.id}`)}
              >
                {userProfile?.fullName}
              </span>
            </p>
            <button
              className="btn btn-outline-none p-0 m-0 col-md-3 text-left text-danger"
              onClick={() => handleSignOut()}
              style={isAuth ? { display: "block" } : { display: "none" }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
        <div className="col-md-1 p-0">
          <Link to={ROUTES.CART}>
            <i
              className={`bi bi-cart align-middle mr-2 fw-2 ${
                cart?.length === 0 ? "text-danger" : "text-sucess"
              }`}
            ></i>
          </Link>
          <span>{cart?.length === 0 ? 0 : cart?.length}</span>
        </div>
      </div>

      <nav className="navbar navbar-expand-md bg-content sticky-sm-top">
        <div className="container-fluid p-0">
          <button
            className="navbar-toggler border-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse p-0 my-auto" id="navbarNav">
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
                  className="nav-link text-white dropdown-toggle text-white header-font "
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
              className="form-control mr-2 w-100"
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