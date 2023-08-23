import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constants/routes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllUserAccounts,
  setEditUser,
} from "../../redux/feature/UserAccount/userAccountSlice";

const ShowUserInformation = (props) => {
  const { editUser } = useSelector((state) => state.userAccount);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    actFetchAllUserAccounts();
  }, []);
  const renderUserInformation = (userProfile) => {
    return (
      <div className="my-3 p-3 border">
        <div className="">
          <h4>
            Thông tin cá nhân tài khoản <a href="#">{userProfile.email}</a>:
          </h4>
        </div>
        <div className="container-fluid">
          <div className="row m-0">
            <p className="col-md-3">Họ và tên</p>
            <p className="col-md-9">{userProfile.fullName}</p>
          </div>
          <div className="row m-0">
            <p className="col-md-3">Email</p>
            <p className="col-md-9">{userProfile.email}</p>
          </div>
          <div className="row m-0">
            <p className="col-md-3">Số điện thoại</p>
            <p className="col-md-9">{userProfile.phone}</p>
          </div>
          <div className="row m-0">
            <p className="col-md-3">Địa chỉ</p>
            <p className="col-md-9">{userProfile.address}</p>
          </div>
          <div className="row m-0">
            <p className="col-md-3">Tỉnh</p>
            <p className="col-md-9">{userProfile.provinceName}</p>
          </div>
          <div className="row m-0">
            <p className="col-md-3">Huyện</p>
            <p className="col-md-9">{userProfile.districtName}</p>
          </div>
          <div className="row m-0">
            <p className="col-md-3">Xã</p>
            <p className="col-md-9">{userProfile.ward}</p>
          </div>
          <div className="row m-0">
            <p className="col-md-3">Đăng ký lúc</p>
            <p className="col-md-9">{userProfile.createdAt}</p>
          </div>

          <div className="d-flex">
            <button
              className="btn btn-primary me-2"
              onClick={() => {
                dispatch(setEditUser(true));
                navigate(`/userAccount/${userProfile.id}?edit=${editUser}`);
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

  return <div>{renderUserInformation(props.userProfile)}</div>;
};

export default ShowUserInformation;
