import React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constants/routes";

const ShowUserInformation = (props) => {
  const navigate = useNavigate();
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
            <p className="col-md-2">Họ và tên</p>
            <p className="col-md-3">{userProfile.fullName}</p>
          </div>
          <div className="row m-0">
            <p className="col-md-2">Email</p>
            <p className="col-md-3">{userProfile.email}</p>
          </div>
          <div className="row m-0">
            <p className="col-md-2">Số điện thoại</p>
            <p className="col-md-3">{userProfile.phone}</p>
          </div>

          <div className="row m-0">
            <p className="col-md-2">Đăng ký lúc</p>
            <p className="col-md-3">{userProfile.createdAt}</p>
          </div>

          <div className="d-flex">
            <button
              className="btn btn-primary me-2"
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

  return <div>{renderUserInformation(props.userProfile)}</div>;
};

export default ShowUserInformation;
