import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetIntroduce } from "../../redux/feature/Introduce/introduceSlice";

const Introduce = () => {
  const callBackUrl = window.location.pathname;

  localStorage.setItem("callBackUrl", JSON.stringify(callBackUrl));
  const { introduce } = useSelector((state) => state.introduce);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetIntroduce());
  }, []);
  const renderIntroduce = () => {
    return introduce?.map((item) => {
      return (
        <div>
          <h4 style={{ fontWeight: 600, color: "blue" }}>{item.title}</h4>
          <p style={{ lineHeight: 2 }}>{item.content}</p>
        </div>
      );
    });
  };

  return <div className="col-md-9 text-left pt-3">{renderIntroduce()}</div>;
};

export default Introduce;
