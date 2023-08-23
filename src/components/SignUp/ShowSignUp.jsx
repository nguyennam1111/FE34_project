import React from "react";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
  actLogin,
  changePassword,
  logout,
} from "../../redux/feature/Authenticate/authSlice";
import {
  actAddUserAccount,
  actFetchAllUserAccounts,
  actUpdateUserAccount,
} from "../../redux/feature/UserAccount/userAccountSlice";
import ShowLocation from "../Location/ShowLocation";

const ShowSignUp = () => {
  const phonePattern = /^((0|84)[3|5|7|8|9])+(\d{8})$\b/g;
  const { isAuth, userProfile, isChangePass } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eyePassword, setEyePassword] = useState("password");
  const [eyeConfirmedPass, setEyeConfirmedPass] = useState("password");
  const [eyeOldPassword, setEyeOldPassword] = useState("password");
  const {
    userAccounts,
    userAccountDetail,
    existEmailError,
    isExist,
    editUser,
  } = useSelector((state) => state.userAccount);

  const params = useParams();
  const [searchParams] = useSearchParams();
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");

  const backToUrl =
    JSON.parse(localStorage.getItem("currentUrl")) ?? ROUTES.HOME;

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
    address: Yup.string().required("Nhập địa chỉ"),
    province: Yup.string().required("Chọn tỉnh thành"),
    district: Yup.string().required("Chọn quận huyện"),
    ward: Yup.string().required("Chọn phường xã"),
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
              (value, context) => value == context.parent.inputPassword
            )
        : // .oneOf([Yup.ref("inputPassword")], "Xác nhận mật khẩu không đúng")
          ""
      : Yup.string()
          .min(6, "Mật khẩu từ 6 ký tự trở lên")
          .max(12, "Mật khẩu tối đa 12 ký tự")
          .required("Nhập lại mật khẩu")
          .test(
            "matchPass",
            "Xác nhận mật khẩu không đúng",
            (value, context) => value == context.parent.inputPassword
          ),
    //   .oneOf([Yup.ref("inputPassword")], "Xác nhận mật khẩu không đúng"),
  });

  const methods = useForm({
    defaultValue: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      province: "",
      ward: "",
      password: "",
      oldPassword: "",
    },
    mode: "onSubmit",

    resolver: yupResolver(schemaSignUp),
  });
  const {
    handleSubmit: handleSignUp,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
    register,
  } = methods;
  useEffect(() => {
    dispatch(actLogin());
  }, [userProfile.id]);
  useEffect(() => {
    dispatch(actFetchAllUserAccounts());
  }, []);
  const onValid = (formState) => {
    dispatch(
      actAddUserAccount({
        ...formState,
        provinceName: provinceName,
        districtName: districtName,

        password: formState.inputPassword,
        admin: "No",
        createdAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
      })
    );

    navigate(ROUTES.SIGNIN);
  };

  const onUpdate = async (data) => {
    let updateData = {};
    isChangePass
      ? (updateData = {
          ...data,
          provinceName: provinceName,
          districtName: districtName,

          password: data.inputPassword,
          createdAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
        })
      : (updateData = {
          ...data,
          provinceName: provinceName,
          districtName: districtName,

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

  const renderSignUp = () => {
    return (
      <>
        <div
          className="m-0"
          style={
            isAuth ? { display: "none" } : { display: "" }
            // editUser ? { display: "none" } : { display: "" })
          }
        >
          <h4 className="mt-3">ĐĂNG KÝ</h4>
          <p className="">
            Nếu bạn đã có tài khoản, vui lòng chuyển qua đăng nhập tại trang
            <a href="SignIn" className="text-decoration-none">
              {" "}
              ĐĂNG NHẬP
            </a>{" "}
            hoặc đăng ký mới tại đây
          </p>
        </div>
        <div
          className="m-0"
          style={
            isAuth ? { display: "" } : { display: "none" }
            //  editUser
            //   ? { display: "" }
            //   : { display: "none" }
            // : { display: "none" }
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
              <div className=" col-md-8 ">
                <Controller
                  render={({ field }) => (
                    <input
                      className={`form-control`}
                      disabled={isAuth ? !editUser : isAuth}
                      {...field}
                    />
                  )}
                  name="firstName"
                  control={control}
                  defaultValue={isAuth ? userProfile?.firstName : ""}
                />
              </div>

              <div className="row m-0">
                <span className="col-md-2"></span>
                <p className="text-danger m-0 me-0 col-md-8 p-0">
                  {errors.firstName?.message}
                </p>
              </div>
            </div>

            <div className="row align-items-center m-0 mt-2">
              <p className="col-md-2 m-0 ">
                Tên <span className="text-danger p-0 m-0">*</span>
              </p>
              <div className="col-md-8">
                <Controller
                  render={({ field }) => (
                    <input
                      className={`form-control  `}
                      disabled={isAuth ? !editUser : isAuth}
                      {...field}
                    />
                  )}
                  name="lastName"
                  control={control}
                  defaultValue={editUser ? userProfile?.lastName : ""}
                />
              </div>
              <div className="row">
                <span className="col-md-2"></span>
                <p className="text-danger m-0 col-md-8">
                  {errors.lastName?.message}
                </p>
              </div>
            </div>

            <div className=" row align-items-center m-0 mt-2">
              <p className="col-md-2 m-0">
                Email <span className="text-danger">*</span>
              </p>
              <div className="col-md-8">
                <Controller
                  render={({ field }) => (
                    <>
                      <input
                        id="email"
                        className={`form-control  `}
                        disabled={isAuth}
                        {...field}
                      />
                    </>
                  )}
                  name="email"
                  control={control}
                  defaultValue={isAuth ? userProfile.email : ""}
                />
              </div>
              <div className="row">
                <span className="col-md-2"></span>
                <p className="text-danger m-0 col-md-8">
                  {errors.email?.message}
                </p>
              </div>
            </div>

            <div className=" row m-0 mt-2">
              <p className="col-md-2 m-0 ">
                Điện Thoại <span className="text-danger">*</span>
              </p>
              <div className="col-md-8">
                <Controller
                  render={({ field }) => (
                    <>
                      <input
                        className={`form-control col-md-8 `}
                        disabled={isAuth ? !editUser : isAuth}
                        {...field}
                      />
                    </>
                  )}
                  name="phone"
                  control={control}
                  defaultValue={editUser ? userProfile?.phone : ""}
                />
              </div>
              <div className="row">
                <span className="col-md-2"></span>
                <p className="text-danger m-0 col-md-8">
                  {errors.phone?.message}
                </p>
              </div>
            </div>
            <div className=" row m-0 mt-2">
              <p className="col-md-2 m-0 ">
                Địa chỉ <span className="text-danger">*</span>
              </p>
              <div className="col-md-8">
                <Controller
                  render={({ field }) => (
                    <>
                      <input
                        className={`form-control col-md-8 `}
                        disabled={isAuth ? !editUser : isAuth}
                        {...field}
                      />
                    </>
                  )}
                  name="address"
                  control={control}
                  defaultValue={editUser ? userProfile?.address : ""}
                />
              </div>
              <div className="row">
                <span className="col-md-2"></span>
                <p className="text-danger m-0 col-md-8">
                  {errors.address?.message}
                </p>
              </div>
            </div>
            <div className="row col-md-8 offset-md-2 px-3">
              <ShowLocation
                watch={watch}
                setValue={setValue}
                setProvinceName={setProvinceName}
                setDistrictName={setDistrictName}
                register={register}
                errors={errors}
                editUser={editUser}
              />
            </div>
            <div
              style={
                isAuth
                  ? editUser
                    ? { display: "" }
                    : { display: "none" }
                  : { display: "none" }
              }
            >
              <p
                className="offset-md-2 text-primary mt-2 me-3 setHover"
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
                <div className="col-md-8">
                  <Controller
                    render={({ field }) => (
                      <div className="d-flex">
                        <input
                          type={eyeOldPassword}
                          className={`form-control `}
                          disabled={isAuth ? !editUser : isAuth}
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
                      </div>
                    )}
                    name="oldPassword"
                    control={control}
                    defaultValue=""
                  />
                </div>
                <div className="row">
                  <span className="col-md-2"></span>
                  <p className="text-danger m-0 col-md-8">
                    {errors.oldPassword?.message}
                  </p>
                </div>
              </div>
              <div className=" row m-0 mt-2">
                <p className="col-md-2 m-0">
                  Mật khẩu <span className="text-danger">*</span>
                </p>
                <div className="col-md-8">
                  <Controller
                    render={({ field }) => (
                      <div className="d-flex">
                        <input
                          type={eyePassword}
                          className={`form-control`}
                          disabled={isAuth ? !editUser : isAuth}
                          {...field}
                        />
                        <i
                          className={`bi ${
                            eyePassword === "password"
                              ? "bi-eye-slash"
                              : "bi-eye"
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
                    name="inputPassword"
                    control={control}
                    defaultValue=""
                  />
                </div>

                <div className="row">
                  <span className="col-md-2"></span>
                  <p className="text-danger m-0 col-md-8">
                    {errors.inputPassword?.message}
                  </p>
                </div>
              </div>
              <div>
                <div className=" row m-0 mt-2">
                  <p className="col-md-2 m-0">
                    Xác nhận mật khẩu <span className="text-danger">*</span>
                  </p>
                  <div className="col-md-8">
                    <Controller
                      render={({ field }) => (
                        <div className="d-flex">
                          <input
                            type={eyeConfirmedPass}
                            className="form-control"
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
                        </div>
                      )}
                      name="confirmedPassword"
                      control={control}
                      defaultValue=""
                    />
                  </div>
                  <div className="row">
                    <span className="col-md-2"></span>
                    <p className="text-danger m-0 col-md-8">
                      {errors.confirmedPassword?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row me-0 offset-md-2">
              <div className="d-flex p-0 mt-2">
                <button
                  className="btn btn-primary border-0 px-2 me-2 text-white"
                  type="submit"
                >
                  {editUser ? "Cập nhật" : "ĐĂNG KÝ"}
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
            <div className="row me-0 offset-md-2">
              <div className="d-flex  p-0 align-items-center">
                <img
                  src="https:////bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                  alt="Facebook"
                  className="img-fluid mt-3 me-2 img-social "
                ></img>

                <img
                  src="	https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                  alt="Google+"
                  className="img-fluid ml-md-2 mt-3 img-social"
                ></img>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  };

  return <div>{renderSignUp()}</div>;
};

export default ShowSignUp;
