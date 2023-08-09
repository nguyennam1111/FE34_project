import React from "react";
import { ROUTES } from "../../constants/routes";
import { useNavigate } from "react-router";

const Transportation = (props) => {
  const navigate = useNavigate();
  const renderTransportationPloicy = (data) => {
    return data?.map((item) => {
      return (
        <div className="container-fluid m-0 py-3">
          <h5>{item?.transportation?.content}</h5>
          {item?.transportation?.description.map((ele) => {
            return <p>{ele}</p>;
          })}
        </div>
      );
    });
  };
  return <> {renderTransportationPloicy(props.data)}</>;
};

export default Transportation;
