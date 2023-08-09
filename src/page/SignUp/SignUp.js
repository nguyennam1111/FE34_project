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
import { actLogin, logout } from "../../redux/feature/Authenticate/authSlice";

const SignUp = () => {
  const phonePattern = /^((0|84)[3|5|7|8|9])+(\d{8})$\b/g;
  const { isAuth, userProfile } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eyePassword, setEyePassword] = useState("password");
  const [eyeConfirmedPass, setEyeConfirmedPass] = useState("password");
  const { userAccounts, userAccountDetail, existEmailError, isExist } =
    useSelector((state) => state.userAccount);

  const [isEdit, setIsEdit] = useState(false);
  const params = useParams();

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
    inputPassword: Yup.string()
      .min(6, "Mật khẩu từ 6 ký tự trở lên")
      .max(12, "Mật khẩu tối đa 12 ký tự")
      .required("Nhập mật khẩu"),

    confirmedPassword: Yup.string()
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
    },
    mode: "onSubmit",

    resolver: yupResolver(schemaSignUp),
  });

  useEffect(() => {
    dispatch(actLogin());
  }, [userProfile.id]);

  const onValid = (formState) => {
    console.log(formState, "data onvalid");
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
    navigate(ROUTES.HOME);
  };
  const onUpdate = async (data) => {
    const updateData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.inputPassword,
      createdAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
    };
    // userAccountApi.updateUserAccount(userProfile.id, updateData);
    dispatch(
      actUpdateUserAccount({ id: userProfile.id, formData: updateData })
    );
    setIsEdit(false);
    alert("Vui lòng đăng nhập lại với thông tin đã cập nhật");
    dispatch(logout());
    navigate(ROUTES.SIGNIN);
  };

  return (
    <div className="container-fluid text-left">
      <div className="col-sm-12 p-0">
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

      <div
        className="m-0"
        style={isAuth ? { display: "none" } : { display: "" }}
      >
        <h4 className="col-sm-12 mt-3">ĐĂNG KÝ</h4>
        <p className="col-sm-12">
          Nếu bạn đã có tài khoản, vui lòng chuyển qua đăng nhập tại trang
          <a href="SignIn"> ĐĂNG NHẬP</a> hoặc đăng ký mới tại đây
        </p>
      </div>

      <div className="col-sm-12 mx-3">
        <form onSubmit={handleSignUp(isAuth ? onUpdate : onValid)}>
          <label className="row m-0 mt-2">
            <p className="col-sm-2 m-0 ">
              Họ <span className="text-danger">*</span>
            </p>
            <Controller
              render={({ field }) => (
                <>
                  <input
                    className="form-control col-sm-9"
                    disabled={isAuth ? !isEdit : ""}
                    {...field}
                  />
                </>
              )}
              name="firstName"
              control={control}
              defaultValue={isAuth ? userProfile?.firstName : ""}
            />
          </label>
          <p className="text-danger offset-sm-2 mt-2">
            {errors.firstName?.message}
          </p>
          <label className=" row m-0 mt-2">
            <p className="col-sm-2 m-0 ">
              Tên <span className="text-danger">*</span>
            </p>
            <Controller
              render={({ field }) => (
                <input
                  className="form-control col-sm-9"
                  disabled={isAuth ? !isEdit : ""}
                  {...field}
                />
              )}
              name="lastName"
              control={control}
              defaultValue={isAuth ? userProfile?.lastName : ""}
            />
          </label>
          <p className="text-danger offset-sm-2 mt-2">
            {errors.lastName?.message}
          </p>
          <div>
            <label className=" row m-0 mt-2">
              <p className="col-sm-2 m-0 ">
                Email <span className="text-danger">*</span>
              </p>
              <Controller
                render={({ field }) => (
                  <>
                    <input
                      id="email"
                      className="form-control col-sm-9"
                      disabled={isAuth}
                      {...field}
                    />
                  </>
                )}
                name="email"
                control={control}
                defaultValue={isAuth ? userProfile?.email : ""}
              />
              <p className="text-danger offset-sm-2 mt-2">
                {errors.email?.message}
              </p>
            </label>
          </div>

          <label className=" row m-0 mt-2">
            <p className="col-sm-2 m-0 ">
              Điện Thoại <span className="text-danger">*</span>
            </p>
            <Controller
              render={({ field }) => (
                <>
                  <input
                    className="form-control col-sm-9"
                    disabled={isAuth ? !isEdit : ""}
                    {...field}
                  />
                </>
              )}
              name="phone"
              control={control}
              defaultValue={isAuth ? userProfile?.phone : ""}
            />
          </label>
          <p className="text-danger offset-sm-2 mt-2">
            {errors.phone?.message}
          </p>
          <label className=" row m-0 mt-2">
            <p className="col-sm-2 m-0">
              Mật khẩu <span className="text-danger">*</span>
            </p>
            <Controller
              render={({ field }) => (
                <>
                  <input
                    type={eyePassword}
                    className="form-control col-sm-9"
                    disabled={isAuth ? !isEdit : ""}
                    {...field}
                  />
                  <i
                    className={`bi ${
                      eyePassword === "password" ? "bi-eye-slash" : "bi-eye"
                    } my-auto toggle-eye`}
                    id="togglePassword"
                    onClick={() => {
                      if (isEdit) {
                        eyePassword === "password"
                          ? setEyePassword("text")
                          : setEyePassword("password");
                      }
                    }}
                  />
                </>
              )}
              name="inputPassword"
              control={control}
              defaultValue={isAuth ? userProfile?.password : ""}
            />
          </label>
          <p className="text-danger offset-sm-2 mt-2">
            {errors.inputPassword?.message}
          </p>

          <div style={isEdit ? { display: "" } : { display: "none" }}>
            <label className=" row m-0 mt-2">
              <p className="col-sm-2 m-0">
                Xác nhận mật khẩu <span className="text-danger">*</span>
              </p>
              <Controller
                render={({ field }) => (
                  <>
                    <input
                      type={eyeConfirmedPass}
                      className="form-control col-sm-9"
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
            </label>

            <p className="text-danger offset-sm-2 mt-2">
              {errors.confirmedPassword?.message}
            </p>
          </div>
          <div
            className=" row m-0 mt-2"
            style={isAuth ? { display: "" } : { display: "none" }}
          >
            <p className="col-sm-2 m-0">Đăng ký lúc:</p>
            <p className="col-sm-9 p-0">{userProfile?.createdAt}</p>
          </div>

          <div className="row mr-0 offset-sm-2">
            <div className="row col-sm-9 p-0 mt-2">
              <button
                className="btn bg-content px-2 mr-2 text-white"
                type="submit"
                onClick={() => setIsEdit(true)}
              >
                {isAuth ? (isEdit ? "Cập nhật" : "Sửa") : "ĐĂNG KÝ"}
              </button>
              <button
                className="btn btn-secondary px-2 m-0 text-white"
                type="button"
                onClick={() => {
                  navigate(ROUTES.HOME);
                }}
              >
                HỦY
              </button>
            </div>
          </div>
          <div className="row mr-0 offset-sm-2">
            <div className="row  col-sm-9  p-0 align-items-center">
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
    </div>
  );
};

export default SignUp;
