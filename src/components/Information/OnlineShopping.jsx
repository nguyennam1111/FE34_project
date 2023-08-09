import React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constants/routes";

const OnlineShopping = (props) => {
  const navigate = useNavigate();
  const renderOnlineShopping = (data) => {
    return data?.map((item) => {
      return (
        <div className="container-fluid m-0 py-3">
          <h5>{item?.onlineShopping?.content}</h5>
          {item?.onlineShopping?.description?.map((ele) => {
            return <p>{ele}</p>;
          })}
        </div>
      );
    });
  };
  return <> {renderOnlineShopping(props.data)}</>;
};

export default OnlineShopping;
