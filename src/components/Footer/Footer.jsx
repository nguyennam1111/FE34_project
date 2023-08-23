import React from "react";
import "./footerStyle.css";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useSelector } from "react-redux";

const Footer = () => {
  const currentUrl = window.location.pathname;
  localStorage.setItem("currentUrl", JSON.stringify(currentUrl));
  const { isAuth, userProfile } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const catalogue = searchParams.get("catalogue");

  const status = searchParams.get("status");
  const pathname = window.location.pathname;
  const handleVerifyLogin = () => (isAuth ? "" : alert("Bạn chưa đăng nhập"));
  // <Alert message="Bạn chưa đăng nhập" type="warning" closable />

  return (
    <div className="m-0 container-fluid">
      <div className="row m-0 py-5 justify-content-between footer-style">
        <div className="col-md-4">
          <h5>LIÊN HỆ VỚI CHÚNG TÔI</h5>
          <p>Số 442 Đội Cấn, P. Cống Vị, Q. Ba Đình, Hà Nội</p>
          <p>(04) 6674 2332 - (04) 6674 2332</p>
          <p>8h00 - 20h00 từ thứ 2 đến thứ 6</p>
          <h5>KẾT NỐI TỚI CHÚNG TÔI</h5>
          <div className="d-flex">
            <img
              className="img-fluid mr-2"
              style={{ width: 30, height: 30 }}
              src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-facebook-communication-social-media-png-image_6315969.png"
              alt="FaceBook"
              href=""
            ></img>
            <img
              className="img-fluid mr-2"
              style={{ width: 30, height: 30 }}
              src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-icon-png-image_6315986.png"
              alt="Twitter"
            ></img>
            <img
              className="img-fluid mr-2"
              style={{ width: 30, height: 30 }}
              src="https://png.pngtree.com/element_our/sm/20180509/sm_5af2ca57be5eb.jpg"
              alt="Google+"
            ></img>
            <img
              className="img-fluid"
              style={{ width: 30, height: 30 }}
              src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-instagram-icon-png-image_6315974.png"
              alt="Instagram"
            ></img>
          </div>
        </div>
        <div className="col-md-2 ">
          <h5>THÔNG TIN</h5>

          <p>
            <Link
              className={`text-decoration-none ${
                pathname == `/userAccount/${params.id}`
                  ? `active fw-bolder text-primary`
                  : ""
              }`}
              onClick={() => handleVerifyLogin()}
              to={isAuth ? `/userAccount/${userProfile.id}` : ""}
            >
              Tài khoản của bạn
            </Link>
          </p>
          <p>
            <Link
              className={`text-decoration-none ${
                status == "history" ? `active fw-bolder text-primary` : ""
              }`}
              to={isAuth ? `/Payment/${userProfile.id}?status=history` : ""}
              onClick={() => handleVerifyLogin()}
            >
              Lịch sử mua hàng
            </Link>
          </p>
          <p>
            <Link
              to={"/Information?catalogue=transportationPolicy"}
              className={`text-decoration-none ${
                catalogue == "transportationPolicy"
                  ? `active fw-bolder text-primary`
                  : ""
              }`}
            >
              Chính sách vận chuyển
            </Link>
          </p>
          <p>
            <Link
              to={"/Information?catalogue=OnlineShopping"}
              className={`text-decoration-none ${
                catalogue == "OnlineShopping"
                  ? `active fw-bolder text-primary`
                  : ""
              }`}
            >
              Hướng dẫn mua online
            </Link>
          </p>
          <p>
            <Link
              to={ROUTES.CONTACTUS}
              className={`text-decoration-none ${
                pathname == "/ContactUs" ? `active fw-bolder text-primary` : ""
              }`}
            >
              Liên hệ
            </Link>
          </p>
        </div>
        <div className="col-md-2">
          <h5>SẢN PHẨM</h5>
          <p>
            <Link
              to={"/Products?"}
              className={`text-decoration-none ${
                pathname == "/Products" && catalogue == null && status == null
                  ? `active fw-bolder text-primary`
                  : ""
              }`}
            >
              Tất cả sản phẩm
            </Link>
          </p>
          <p>
            <Link
              to={"/Products?catalogue=boy"}
              className={`text-decoration-none ${
                catalogue == "boy" ? `active fw-bolder text-primary` : ""
              }`}
            >
              Góc bé trai
            </Link>
          </p>
          <p>
            <Link
              to={"/Products?catalogue=girl"}
              className={`text-decoration-none ${
                catalogue == "girl" ? `active fw-bolder text-primary` : ""
              }`}
            >
              Góc bé gái
            </Link>
          </p>
          <p>
            <Link
              to={"/Products?catalogue=accessory"}
              className={`text-decoration-none ${
                catalogue == "accessory" ? `active fw-bolder text-primary` : ""
              }`}
            >
              Phụ kiện
            </Link>
          </p>
          <p>
            <Link
              to={"/Products?status=promote"}
              className={`text-decoration-none ${
                status == "promote" ? `active fw-bolder text-primary` : ""
              }`}
            >
              Khuyễn mãi
            </Link>
          </p>
        </div>
        <div className="col-md-2">
          <h5>LIÊN KẾT BLOG</h5>
          <p>
            <a href="#" className="text-decoration-none">
              Cẩm nang cho mẹ
            </a>
          </p>
          <p>
            <a href="#" className="text-decoration-none">
              Chương trình ưu đãi
            </a>
          </p>
          <p>
            <a href="#" className="text-decoration-none">
              Tin thời trang
            </a>
          </p>
          <p>
            <a href="#" className="text-decoration-none">
              Góc chia sẻ
            </a>
          </p>
        </div>
      </div>
      <div className="text-white text-center bg-content">
        <p className="py-3 m-0">&copy; Bản quyền thuộc về FE34 -Iviettech</p>
      </div>
    </div>
  );
};

export default Footer;
