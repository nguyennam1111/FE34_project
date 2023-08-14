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

const SignIn = () => {
  const [eyePassword, setEyePassword] = useState("password");
  const { userAccounts } = useSelector((state) => state.userAccount);
  const { isAuth, userProfile, loginError, isForgot, isChangePass } =
    useSelector((state) => state.auth);
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
      .oneOf(
        userAccounts?.map((item) => item.email),
        "Email không đúng"
      ),
    loginPassword: Yup.string()
      .required("Nhập mật khẩu")
      .test("matchPass", "Mật khẩu không đúng", (value, context) => {
        const index = userAccounts?.findIndex(
          (item) =>
            item.email === context.parent.loginUser && item.password === value
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

  useEffect(() => {
    dispatch(actLogin());
  }, [isAuth]);

  const onValidLogin = (data) => {
    dispatch(setForgotPassword(false));
    dispatch(actLogin(data));
    navigate(backToUrl);
  };

  const onValidRecover = (recoverData) => {
    const validEmail = userAccounts.find(
      (item) => item.email === recoverData.recoverEmail
    );
    console.log(validEmail, "validEmail");
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
    <div className="m-0 text-left container-fluid">
      <div className="col-sm-12 p-0">
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME}>Trang chủ</Link>
          </li>
          <li className="breadcrumb-item active">
            <a className="active">Đăng nhập</a>
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
      <div
        className="col-sm-6"
        style={
          ({ color: "#686868" },
          isForgot ? { display: "none" } : { display: "" })
        }
      >
        <h4 className="pt-4">ĐĂNG NHẬP</h4>
        <p>
          Nếu bạn có một tài khoản, xin vui lòng đăng nhập hoặc đăng ký mới
          <a href="SignUp"> Đăng ký</a> nếu chưa có tài khoản
        </p>

        <form key={1} onSubmit={handleSignIn(onValidLogin)}>
          <p className="text-danger">{loginError}</p>
          <label className="row">
            <p className="col-sm-3 pr-0">
              Tên đăng nhập<span className="text-danger"> *</span>
            </p>
            <Controller
              render={({ field }) => (
                <input className="form-control col-sm-8" {...field} />
              )}
              id="loginUser"
              name="loginUser"
              control={control}
              defaultValue=""
            />
          </label>
          <p className="text-danger offset-sm-4 mx-0 my-2 text-left">
            {errors.loginUser?.message}
          </p>

          <label className=" row">
            <p className="col-sm-3 pr-0">
              Mật khẩu <span className="text-danger">*</span>
            </p>
            <Controller
              render={({ field }) => (
                <>
                  <input
                    type={eyePassword}
                    className="form-control col-sm-8"
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
                </>
              )}
              id="loginPassword"
              name="loginPassword"
              control={control}
              defaultValue=""
            />
          </label>
          <p className="text-danger offset-sm-4 mx-0 my-2 text-left">
            {errors.loginPassword?.message}
          </p>

          <div className="row m-0">
            <div
              className="col-sm-8 p-0 offset-sm-3 forgot-pass"
              onClick={() => dispatch(setForgotPassword(true))}
            >
              <p>Quên mật khẩu</p>
            </div>
            <div className="col-sm-8 p-0 offset-sm-3">
              <button className="btn text-white bg-content p-0" type="submit">
                ĐĂNG NHẬP
              </button>

              <button
                className="btn btn-secondary ml-sm-3 p-0"
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
        <div className="row m-0">
          <div className="col-sm-8 mt-2 p-0 offset-sm-3">
            <img
              src="https:////bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
              alt="Facebook"
              className="img-fluid "
              style={{ width: 100, maxWidth: "100%" }}
            ></img>

            <img
              src="	https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
              alt="Google+"
              className="img-fluid ml-sm-3"
              style={{ width: 100, maxWidth: "100%" }}
            ></img>
          </div>
        </div>
      </div>

      <div
        className="col-sm-6 "
        style={
          ({ color: "#686868" },
          isForgot ? { display: "" } : { display: "none" })
        }
      >
        <h4 className="pt-4">QUÊN MẬT KHẨU</h4>
        <h6>Bạn đã có một tài khoản nhưng không nhớ mật khẩu.</h6>
        <p className="pt-3  ">
          Hãy điền Email đã đăng ý vào phía dưới và nhận thông tin qua Email để
          có thể lấy lại mật khẩu.
        </p>
        <form key={2} onSubmit={handleRecoverPassword(onValidRecover)}>
          <label className="row">
            <p className="col-sm-3">Email</p>
            <Controller
              render={({ field }) => (
                <input className="form-control col-sm-8" {...field} />
              )}
              id="recoverEmail"
              name="recoverEmail"
              control={control2}
              defaultValue=""
            />
          </label>
          <p className="text-danger">{errors2.recoverEmail?.message}</p>
          <div className="row">
            <div className="col-sm-8 offset-sm-3 p-0 ">
              <button className="btn bg-content sm p-0 px-3">GỬI</button>
              <button
                className="btn btn-secondary ml-sm-3 p-0 px-3"
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
  );
};

export default SignIn;
