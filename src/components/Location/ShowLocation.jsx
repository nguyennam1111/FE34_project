import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actGetAllDistrict,
  actGetAllProvince,
  actGetAllWard,
} from "../../redux/feature/Location/getLocationSlice";
import { ContactsFilled } from "@ant-design/icons";

const ShowLocation = (props) => {
  const dispatch = useDispatch();

  const { provinces, districts, wards } = useSelector(
    (state) => state.location
  );

  const provinceCode = props.watch("province");
  const districtCode = props.watch("district");

  useEffect(() => {
    dispatch(actGetAllProvince());
    dispatch(actGetAllDistrict(provinceCode));
    dispatch(actGetAllWard(districtCode));
  }, [provinceCode, districtCode]);

  useEffect(() => {
    props.setValue("district", "");
    props.setValue("ward", "");
  }, [provinceCode]);

  const renderLocation = (register, errors) => {
    return (
      <>
        <select
          // {...register("province")}
          name="province"
          id="province"
          className="form-control mt-2"
          onChange={(e) => props.setValue("province", e.target.value)}
        >
          <option value="" selected disabled>
            Chọn tỉnh thành*
          </option>
          {provinces?.map((item) => {
            props.setProvinceName(item.name);
            return (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            );
          })}
        </select>
        <p className="m-0 text-danger">{errors?.province?.message}</p>

        <select
          // {...register("district")}
          name="district"
          id="district"
          className="form-control mt-2"
          onChange={(e) => props.setValue("district", e.target.value)}
        >
          <option value="" selected disabled>
            Chọn quận huyện*
          </option>
          {districts.districts?.map((item) => {
            props.setDistrictName(item.name);
            return (
              <option key={item.code} value={item.code}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <p className="m-0 text-danger">{errors?.district?.message}</p>

        <select
          // {...register("ward")}
          name="ward"
          id="ward"
          className="form-control mt-2"
          onChange={(e) => props.setValue("ward", e.target.value)}
        >
          <option value="" selected disabled>
            Chọn phường xã*
          </option>
          {wards.wards?.map((item) => {
            return (
              <option key={item.code} value={item?.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <p className="m-0 text-danger">{errors?.ward?.message}</p>
      </>
    );
  };

  return <>{renderLocation(props.register, props.errors)}</>;
};

export default ShowLocation;
