import React, { useEffect, useState } from "react";
import "./styleSignUp.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  actAddUserAccount,
  actFetchAllUserAccounts,
  actGetUserAccountbyId,
  actUpdateUserAccount,
} from "../../redux/feature/UserAccount/userAccountSlice";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { userAccountApi } from "../../apis/userAccountApi";
import {
  actLogin,
  changePassword,
  logout,
} from "../../redux/feature/Authenticate/authSlice";
import { current } from "@reduxjs/toolkit";

const SignUp = () => {
  const phonePattern = /^((0|84)[3|5|7|8|9])+(\d{8})$\b/g;
  const { isAuth, userProfile, isChangePass } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eyePassword, setEyePassword] = useState("password");
  const [eyeConfirmedPass, setEyeConfirmedPass] = useState("password");
  const [eyeOldPassword, setEyeOldPassword] = useState("password");
  const { userAccounts, userAccountDetail, existEmailError, isExist } =
    useSelector((state) => state.userAccount);

  const params = useParams();
  const [searchParams] = useSearchParams();
  const backToUrl = JSON.parse(localStorage.getItem("currentUrl"));
  const isEdit = searchParams.get("edit");

  useEffect(() => {
    dispatch(actFetchAllUserAccounts());
  }, []);

  useEffect(() => {
    dispatch(actGetUserAccountbyId(userProfile.id));
    dispatch(actLogin);
  }, [userProfile.id]);

  const schemaSignUp = Yup.object().shape({
    checkExistEmail: Yup.boolean(),
    firstName: Yup.string().max(10, "max=10 ").required("Nhập họ"),
    lastName: Yup.string().max(20, "max=20").required("Nhập tên đệm và tên"),
    email: isAuth
      ? ""
      : Yup.string()
          .email("Sai email")
          .required("Nhập email")

          .notOneOf(
            userAccounts?.map((item) => item.email),
            "Email đã tồn tại, vui lòng nhập email khác hoặc đăng nhập bằng email này"
          ),

    phone: Yup.string().matches(phonePattern, "Số điện thoại không đúng"),
    oldPassword: isChangePass
      ? Yup.string()
          .required("Nhập mật khẩu")
          .test("matchPass", "Mật khẩu không đúng", (value, context) => {
            const index = userAccounts?.findIndex(
              (item) =>
                item.email === context.parent.email && item.password === value
            );

            if (index >= 0) {
              return true;
            }
          })
      : "",
    inputPassword: isAuth
      ? isChangePass
        ? Yup.string()
            .min(6, "Mật khẩu từ 6 ký tự trở lên")
            .max(12, "Mật khẩu tối đa 12 ký tự")
            .required("Nhập mật khẩu")
        : ""
      : Yup.string()
          .min(6, "Mật khẩu từ 6 ký tự trở lên")
          .max(12, "Mật khẩu tối đa 12 ký tự")
          .required("Nhập mật khẩu"),

    confirmedPassword: isAuth
      ? isChangePass
        ? Yup.string()
            .min(6, "Mật khẩu từ 6 ký tự trở lên")
            .max(12, "Mật khẩu tối đa 12 ký tự")
            .required("Nhập lại mật khẩu")
            .test(
              "matchPass",
              "Xác nhận mật khẩu không đúng",
              (value, context) => value === context.parent.email
            )
            .oneOf([Yup.ref("inputPassword")], "Xác nhận mật khẩu không đúng")
        : ""
      : Yup.string()
          .min(6, "Mật khẩu từ 6 ký tự trở lên")
          .max(12, "Mật khẩu tối đa 12 ký tự")
          .required("Nhập lại mật khẩu")
          .oneOf([Yup.ref("inputPassword")], "Xác nhận mật khẩu không đúng"),
  });

  const {
    handleSubmit: handleSignUp,

    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValue: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      oldPassword: "",
    },
    mode: "onSubmit",

    resolver: yupResolver(schemaSignUp),
  });

  useEffect(() => {
    dispatch(actLogin());
  }, [userProfile.id]);

  const onValid = (formState) => {
    dispatch(
      actAddUserAccount({
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        phone: formState.phone,
        password: formState.inputPassword,
        createdAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
      })
    );

    navigate(ROUTES.SIGNIN);
  };
  const onUpdate = async (data) => {
    let updateData = {};
    isChangePass
      ? (updateData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: data.inputPassword,
          createdAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
        })
      : (updateData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          createdAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
        });

    dispatch(
      actUpdateUserAccount({ id: userProfile.id, formData: updateData })
    );
    dispatch(changePassword(false));
    alert("Vui lòng đăng nhập lại với thông tin đã cập nhật");
    dispatch(logout());
    navigate(ROUTES.SIGNIN);
  };

  const renderUserInformation = () => {
    return (
      <div className="my-3 p-3 border">
        <div className="">
          <h4>
            Thông tin cá nhân tài khoản <a href="#">{userProfile.email}</a>:
          </h4>
        </div>
        <div className="container-fluid">
          <div className="row">
            <p className="col-md-2">Họ và tên</p>
            <p className="col-md-3">{userProfile.fullName}</p>
          </div>
          <div className="row">
            <p className="col-md-2">Email</p>
            <p className="col-md-3">{userProfile.email}</p>
          </div>
          <div className="row">
            <p className="col-md-2">Số điện thoại</p>
            <p className="col-md-3">{userProfile.phone}</p>
          </div>

          <div className="row">
            <p className="col-md-2">Đăng ký lúc</p>
            <p className="col-md-3">{userProfile.createdAt}</p>
          </div>

          <div className="d-flex">
            <button
              className="btn btn-primary mr-2"
              onClick={() => {
                navigate(`/userAccount/${userProfile.id}?edit=true`);
              }}
            >
              Chỉnh sửa thông tin
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate(ROUTES.HOME);
              }}
            >
              Quay về
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSignUp = () => {
    return (
      <>
        <div
          className="m-0"
          style={
            isAuth
              ? isEdit
                ? { display: "none" }
                : { display: "" }
              : { display: "" }
          }
        >
          <h4 className="mt-3">ĐĂNG KÝ</h4>
          <p className="">
            Nếu bạn đã có tài khoản, vui lòng chuyển qua đăng nhập tại trang
            <a href="SignIn"> ĐĂNG NHẬP</a> hoặc đăng ký mới tại đây
          </p>
        </div>
        <div
          className="m-0"
          style={
            isAuth
              ? isEdit
                ? { display: "" }
                : { display: "none" }
              : { display: "none" }
          }
        >
          <h4 className="mt-3">CẬP NHẬT THÔNG TIN</h4>
          <p className="">Cập nhật lại các thông tin cá nhân bên dưới</p>
        </div>
        <div className="container-fluid p-0">
          <form onSubmit={handleSignUp(isAuth ? onUpdate : onValid)}>
            <div className="row align-items-center m-0">
              <p className="col-md-2 m-0">
                Họ <span className="text-danger">*</span>
              </p>
              <Controller
                render={({ field }) => (
                  <input
                    className={`form-control col-md-8 `}
                    disabled={isAuth ? !isEdit : isAuth}
                    {...field}
                  />
                )}
                name="firstName"
                control={control}
                defaultValue={isAuth ? userProfile?.firstName : ""}
              />
              <p className="text-danger offset-sm-2">
                {errors.firstName?.message}
              </p>
            </div>

            <div className="row align-items-center m-0 mt-2">
              <p className="col-md-2 m-0 ">
                Tên <span className="text-danger p-0 m-0">*</span>
              </p>
              <Controller
                render={({ field }) => (
                  <input
                    className={`form-control col-md-8 `}
                    disabled={isAuth ? !isEdit : isAuth}
                    {...field}
                  />
                )}
                name="lastName"
                control={control}
                defaultValue={isEdit ? userProfile?.lastName : ""}
              />
              <p className="text-danger offset-sm-2 mt-2">
                {errors.lastName?.message}
              </p>
            </div>

            <div className=" row align-items-center m-0 mt-2">
              <p className="col-md-2 m-0">
                Email <span className="text-danger">*</span>
              </p>
              <Controller
                render={({ field }) => (
                  <>
                    <input
                      id="email"
                      className={`form-control col-md-8 `}
                      disabled={isAuth}
                      {...field}
                    />
                  </>
                )}
                name="email"
                control={control}
                defaultValue={isAuth ? userProfile.email : ""}
              />
              <p className="text-danger offset-sm-2 mt-2">
                {errors.email?.message}
              </p>
            </div>

            <div className=" row m-0 mt-2">
              <p className="col-md-2 m-0 ">
                Điện Thoại <span className="text-danger">*</span>
              </p>
              <Controller
                render={({ field }) => (
                  <>
                    <input
                      className={`form-control col-md-8 `}
                      disabled={isAuth ? !isEdit : isAuth}
                      {...field}
                    />
                  </>
                )}
                name="phone"
                control={control}
                defaultValue={isEdit ? userProfile?.phone : ""}
              />
              <p className="text-danger offset-sm-2 mt-2">
                {errors.phone?.message}
              </p>
            </div>

            <div
              style={
                isAuth
                  ? isEdit
                    ? { display: "" }
                    : { display: "none" }
                  : { display: "none" }
              }
            >
              <p
                className="offset-sm-2 text-primary mt-2 mr-3 setHover"
                onClick={() => {
                  isChangePass
                    ? dispatch(changePassword(false))
                    : dispatch(changePassword(true));
                }}
              >
                {isChangePass ? "Hủy đổi mật khẩu" : "Đổi mật khẩu"}
              </p>
            </div>

            <div
              style={
                isAuth
                  ? isChangePass
                    ? { display: "" }
                    : { display: "none" }
                  : { display: "" }
              }
            >
              <div
                className=" row m-0 mt-2"
                style={
                  isAuth
                    ? isChangePass
                      ? { display: "" }
                      : { display: "none" }
                    : { display: "none" }
                }
              >
                <p className="col-md-2 m-0">
                  Mật khẩu cũ<span className="text-danger">*</span>
                </p>
                <Controller
                  render={({ field }) => (
                    <>
                      <input
                        type={eyeOldPassword}
                        className={`form-control col-md-8 `}
                        disabled={isAuth ? !isEdit : isAuth}
                        {...field}
                      />
                      <i
                        className={`bi ${
                          eyeOldPassword === "password"
                            ? "bi-eye-slash"
                            : "bi-eye"
                        } my-auto toggle-eye`}
                        id="toggleOldPassword"
                        onClick={() => {
                          eyeOldPassword === "password"
                            ? setEyeOldPassword("text")
                            : setEyeOldPassword("password");
                        }}
                      />
                    </>
                  )}
                  name="oldPassword"
                  control={control}
                  defaultValue=""
                />
                <p className="text-danger offset-sm-2 mt-2">
                  {errors.oldPassword?.message}
                </p>
              </div>
              <div className=" row m-0 mt-2">
                <p className="col-md-2 m-0">
                  Mật khẩu <span className="text-danger">*</span>
                </p>
                <Controller
                  render={({ field }) => (
                    <>
                      <input
                        type={eyePassword}
                        className={`form-control col-md-8 `}
                        disabled={isAuth ? !isEdit : isAuth}
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
                  name="inputPassword"
                  control={control}
                  defaultValue=""
                />
                <p className="text-danger offset-sm-2 mt-2">
                  {errors.inputPassword?.message}
                </p>
              </div>
              <div>
                <div className=" row m-0 mt-2">
                  <p className="col-md-2 m-0">
                    Xác nhận mật khẩu <span className="text-danger">*</span>
                  </p>
                  <Controller
                    render={({ field }) => (
                      <>
                        <input
                          type={eyeConfirmedPass}
                          className="form-control col-md-8"
                          {...field}
                        />
                        <i
                          className={`bi ${
                            eyeConfirmedPass === "password"
                              ? "bi-eye-slash"
                              : "bi-eye"
                          } my-auto toggle-eye`}
                          id="toggleConfirmedPassword"
                          onClick={() => {
                            eyeConfirmedPass === "password"
                              ? setEyeConfirmedPass("text")
                              : setEyeConfirmedPass("password");
                          }}
                        />
                      </>
                    )}
                    name="confirmedPassword"
                    control={control}
                    defaultValue=""
                  />
                  <p className="text-danger offset-sm-2 mt-2">
                    {errors.confirmedPassword?.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="row mr-0 offset-sm-2">
              <div className="row col-md-9 p-0 mt-2">
                <button
                  className="btn bg-content px-2 mr-2 text-white"
                  type="submit"
                >
                  {isEdit ? "Cập nhật" : "ĐĂNG KÝ"}
                </button>
                <button
                  className="btn btn-secondary px-2 m-0 text-white"
                  type="button"
                  onClick={() => navigate(ROUTES.HOME)}
                >
                  HỦY
                </button>
              </div>
            </div>
            <div className="row mr-0 offset-sm-2">
              <div className="row  col-md-9  p-0 align-items-center">
                <img
                  src="https:////bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                  alt="Facebook"
                  className="img-fluid mt-3 img-social "
                ></img>

                <img
                  src="	https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                  alt="Google+"
                  className="img-fluid ml-sm-2 mt-3 img-social"
                ></img>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  };

  return (
    <div className="container-fluid text-left">
      <div className="col-md-12 p-0">
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME}>Trang chủ</Link>
          </li>
          <li className="breadcrumb-item active">
            <a className="active">
              {isAuth ? "Thông tin tài khoản" : " Đăng ký "}
            </a>
          </li>
        </ol>
      </div>
      <div className="container-fluid">
        {isAuth
          ? isEdit
            ? renderSignUp()
            : renderUserInformation()
          : renderSignUp()}
      </div>
    </div>
  );
};

export default SignUp;
