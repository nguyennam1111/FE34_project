import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowService from "../../components/service/ShowService";
import { actGetAllService } from "../../redux/feature/service/serviceSlice";

const Services = () => {
  const callBackUrl = window.location.pathname;

  localStorage.setItem("callBackUrl", JSON.stringify(callBackUrl));
  const dispatch = useDispatch();
  const { service } = useSelector((state) => state.service);
  useEffect(() => {
    dispatch(actGetAllService());
  }, []);

  return (
    <div className="col-md-8 text-justify my-3 ">
      <h4>KidShop Services</h4>
      <div>
        <h5 className="text-warning">
          Bán buôn, bán sỉ quần áo trẻ em tại Kids Shop
        </h5>
        <p>
          Với nguồn hàng ổn định. độc đáo, hàng về hàng tháng với số lượng lớn
          và hàng trăm mẫu mã mới ko đụng hàng trên thị trường.
        </p>
      </div>
      <div>
        <p>Các dòng hàng ổn định bao gồm:</p>
        <ShowService data={service} />
      </div>
    </div>
  );
};

export default Services;
