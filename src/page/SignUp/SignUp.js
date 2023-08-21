import React, { useEffect, useState } from "react";
import "./styleSignUp.css";

import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllUserAccounts,
  actGetUserAccountbyId,
} from "../../redux/feature/UserAccount/userAccountSlice";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import { actLogin } from "../../redux/feature/Authenticate/authSlice";

import ShowUserInformation from "../../components/SignUp/ShowUserInformation";
import ShowSignUp from "../../components/SignUp/ShowSignUp";

const SignUp = () => {
  const phonePattern = /^((0|84)[3|5|7|8|9])+(\d{8})$\b/g;
  const { isAuth, userProfile, isChangePass } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const isEdit = searchParams.get("edit");

  useEffect(() => {
    dispatch(actFetchAllUserAccounts());
  }, []);

  useEffect(() => {
    dispatch(actGetUserAccountbyId(userProfile.id));
    dispatch(actLogin);
  }, [userProfile.id]);

  return (
    <div className="container-fluid">
      <div className="py-2 mt-2 bg-light">
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME} className="text-decoration-none">
              Trang chủ
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {isAuth ? "Thông tin tài khoản" : " Đăng ký "}
          </li>
        </ol>
      </div>
      <div className="row m-0 align-items-center align-contents-center">
        <div className="col-md-8">
          {isAuth ? (
            isEdit ? (
              // renderSignUp()
              <ShowSignUp />
            ) : (
              <ShowUserInformation userProfile={userProfile} />
            )
          ) : (
            // renderSignUp()
            <ShowSignUp />
          )}
        </div>
        <div className="col-md-4">
          <img
            src="http://bizweb.dktcdn.net/100/117/632/themes/157694/assets/logo.png?1564585558451"
            className={`img-fluid object-fit-cover w-75`}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
