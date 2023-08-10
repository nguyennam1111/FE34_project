import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetAllService } from "../../redux/feature/service/serviceSlice";

const ShowService = (props) => {
  const renderService = (data) => {
    return data?.map((item, index) => {
      return (
        <ol start={index + 1} key={index}>
          <li>
            <p style={{ fontWeight: 600 }}>{item.title}</p>
            <ul>
              {item.content?.map((ele) => {
                return (
                  <li>
                    <p>{ele}</p>
                  </li>
                );
              })}
            </ul>
          </li>
        </ol>
      );
    });
  };

  return (
    <div
      className="border"
      style={{ maxHeight: 400, height: "100%", overflowY: "scroll" }}
    >
      {renderService(props.data)}
    </div>
  );
};

export default ShowService;
