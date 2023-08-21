import React, { useEffect, useState } from "react";
import "./styleSignIn.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllUserAccounts,
  actUpdateUserAccount,
} from "../../redux/feature/UserAccount/userAccountSlice";
import {
  actLogin,
  loginSuccess,
  setForgotPassword,
} from "../../redux/feature/Authenticate/authSlice";

import { Alert, Space } from "antd";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const [eyePassword, setEyePassword] = useState("password");
  const { userAccounts } = useSelector((state) => state.userAccount);
  const { isAuth, userProfile, loginError, isForgot } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backToUrl =
    JSON.parse(localStorage.getItem("callBackUrl")) ?? ROUTES.HOME;

  useEffect(() => {
    dispatch(actFetchAllUserAccounts());
  }, []);

  const schemaSignIn = Yup.object().shape({
    loginUser: Yup.string()
      .email("Sai email")
      .required("Nhập email đã đăng ký")
      .test("match email", "Email không đúng", (value) =>
        userAccounts.map((item) => item.email == value)
      ),
    // .oneOf(
    //   userAccounts?.map((item) => item.email),
    //   "Email không đúng"
    // ),
    loginPassword: Yup.string()
      .required("Nhập mật khẩu")
      .test("matchPass", "Mật khẩu không đúng", (value, context) => {
        const index = userAccounts?.findIndex(
          (item) =>
            item.email == context.parent.loginUser && item.password == value
        );

        if (index >= 0) {
          return true;
        }
      }),
  });

  const {
    handleSubmit: handleSignIn,
    formState: { errors },
    setError,
    control,
  } = useForm({
    defaultValue: {
      user: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schemaSignIn),
  });

  const schemaRecoverPassword = Yup.object().shape({
    recoverEmail: Yup.string()
      .email("Sai email")
      .required("Nhập email đã đăng ký")
      .oneOf(
        userAccounts.map((item) => item.email),
        "Email không đúng"
      ),
  });
  const {
    handleSubmit: handleRecoverPassword,
    formState: { errors: errors2 },
    control: control2,
  } = useForm({
    defaultValue: {
      email: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schemaRecoverPassword),
  });

  const onValidLogin = (data) => {
    dispatch(actLogin(data));
    toast("Đăng nhập thành công");
    alert("Đăng nhập thành công");
    dispatch(setForgotPassword(false));
    navigate(backToUrl);
  };

  const onValidRecover = (recoverData) => {
    const validEmail = userAccounts.find(
      (item) => item.email === recoverData.recoverEmail
    );

    const resetPassword = { password: "123456" };
    dispatch(
      actUpdateUserAccount({
        id: validEmail.id,
        formData: resetPassword,
      })
    );
    alert(
      `Mật khẩu mới được gởi về email ${recoverData.recoverEmail}. Vui lòng check email và thực hiện đăng nhập lại`
    );
    dispatch(setForgotPassword(false));
  };

  return (
    <div className="m-0 container-fluid">
      <div className="col-md-12 py-2 mt-3 bg-light">
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME} className="text-decoration-none">
              Trang chủ
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <a>Đăng nhập</a>
          </li>
        </ol>
      </div>
      <div style={isAuth ? { display: "" } : { display: "none" }}>
        <h4>Bạn đã đăng nhập</h4>
        <button
          className=" btn btn-success"
          onClick={() => navigate(backToUrl)}
        >
          Quay về
        </button>
      </div>
      <div className="row m-0 align-items-center my-3">
        <div
          className="col-md-8"
          style={
            ({ color: "#686868" },
            isAuth ? { display: "none" } : { display: "" },
            isForgot ? { display: "none" } : { display: "" })
          }
        >
          <h4 className="pt-4">ĐĂNG NHẬP</h4>
          <p>
            Nếu bạn có một tài khoản, xin vui lòng đăng nhập hoặc đăng ký mới
            <a href="SignUp" className="text-decoration-none">
              {" "}
              Đăng ký
            </a>{" "}
            nếu chưa có tài khoản
          </p>

          <form key={1} onSubmit={handleSignIn(onValidLogin)}>
            {/* <p className="text-danger">{loginError}</p> */}

            <div className="row">
              <p className="col-md-3 pe-0 m-0">
                Tên đăng nhập<span className="text-danger"> *</span>
              </p>
              <div className="col-md-8">
                <Controller
                  render={({ field }) => (
                    <input className=" form-control " {...field} />
                  )}
                  id="loginUser"
                  name="loginUser"
                  control={control}
                  defaultValue=""
                />
              </div>
            </div>
            <p className="row text-danger offset-md-3 me-0 my-2">
              {errors.loginUser?.message}
            </p>

            <div className=" row">
              <p className="col-md-3 pe-0 m-0">
                Mật khẩu <span className="text-danger">*</span>
              </p>
              <div className="col-md-8">
                <Controller
                  render={({ field }) => (
                    <div className="d-flex">
                      <input
                        type={eyePassword}
                        className="form-control"
                        {...field}
                      />
                      <i
                        className={`bi ${
                          eyePassword === "password" ? "bi-eye-slash" : "bi-eye"
                        } my-auto toggle-eye`}
                        id="togglePassword"
                        onClick={() => {
                          eyePassword === "password"
                            ? setEyePassword("text")
                            : setEyePassword("password");
                        }}
                      />
                    </div>
                  )}
                  id="loginPassword"
                  name="loginPassword"
                  control={control}
                  defaultValue=""
                />
              </div>
            </div>
            <p className="row text-danger offset-md-3 me-0 my-2">
              {errors.loginPassword?.message}
            </p>

            <div className="row m-0">
              <div
                className="col-md-8 p-0 offset-sm-3"
                onClick={() => dispatch(setForgotPassword(true))}
              >
                <p className="forgot-pass">Quên mật khẩu</p>
              </div>
              <div className=" p-0 offset-md-3 d-flex ">
                <button
                  className="btn btn-primary text-white me-2"
                  type="submit"
                >
                  ĐĂNG NHẬP
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick
                  rtl={true}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    dispatch(setForgotPassword(false));
                    navigate(backToUrl);
                  }}
                >
                  HỦY
                </button>
              </div>
            </div>
          </form>
          <div className="row m-0">
            <div className="col-md-8 mt-2 p-0 offset-md-3">
              <img
                src="https:////bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                alt="Facebook"
                className="img-fluid me-2 "
                style={{ width: 100, maxWidth: "100%" }}
              ></img>

              <img
                src="	https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                alt="Google+"
                className="img-fluid"
                style={{ width: 100, maxWidth: "100%" }}
              ></img>
            </div>
          </div>
        </div>
        <div className={`col-md-4  ${isForgot ? "order-2" : "order-1"}`}>
          <img
            src="http://bizweb.dktcdn.net/100/117/632/themes/157694/assets/logo.png?1564585558451"
            className={`ig-fluid object-fit-cover w-75`}
          ></img>
        </div>

        <div
          className="col-md-8 order-1 my-3"
          style={
            ({ color: "#686868" },
            isForgot ? { display: "" } : { display: "none" })
          }
        >
          <h4 className="pt-4">QUÊN MẬT KHẨU</h4>
          <h6>Bạn đã có một tài khoản nhưng không nhớ mật khẩu.</h6>
          <p className="pt-3  ">
            Hãy điền Email đã đăng ý vào phía dưới và nhận thông tin qua Email
            để có thể lấy lại mật khẩu.
          </p>
          <form key={2} onSubmit={handleRecoverPassword(onValidRecover)}>
            <div className="row">
              <p className="col-md-3">Email</p>
              <div className="col-md-8">
                <Controller
                  render={({ field }) => (
                    <input className="form-control" {...field} />
                  )}
                  id="recoverEmail"
                  name="recoverEmail"
                  control={control2}
                  defaultValue=""
                />
              </div>
            </div>
            <p className="text-danger">{errors2.recoverEmail?.message}</p>
            <div className="row">
              <div className="col-md-8 offset-sm-3 p-0 ">
                <button className="btn bg-content sm p-0 px-3 me-2">GỬI</button>
                <button
                  className="btn btn-secondary col-md-3 p-0 px-3"
                  type="button"
                  onClick={() => {
                    dispatch(setForgotPassword(false));
                    navigate(ROUTES.HOME);
                  }}
                >
                  HỦY
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
