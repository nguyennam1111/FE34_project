import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actGetAllDistrict,
  actGetAllProvince,
  actGetAllWard,
  setDistrictCode,
  setProvinceCode,
} from "../../redux/feature/Location/getLocationSlice";

const ShowLocation = (props) => {
  const dispatch = useDispatch();
  // const [provinceCode, setProvinceCode] = useState("");
  // const [districtCode, setDistrictCode] = useState("");

  const { provinces, districts, wards, provinceCode, districtCode } =
    useSelector((state) => state.location);

  useEffect(() => {
    dispatch(actGetAllProvince());
    dispatch(actGetAllDistrict(provinceCode));
    dispatch(actGetAllWard(districtCode));
  }, [provinceCode, districtCode]);

  useEffect(() => {
    dispatch(setDistrictCode(districtCode));
    dispatch(setProvinceCode(provinceCode));
  }, []);

  const renderLocation = (register, errors) => {
    return (
      <>
        <select
          name="province"
          id="province"
          className="form-control mt-2"
          {...register("province")}
          onChange={(e) => dispatch(setProvinceCode(e.target.value))}
        >
          <option value="" selected disabled>
            Chọn tỉnh thành*
          </option>
          {provinces?.map((item) => {
            return (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            );
          })}
        </select>
        <p className="m-0 text-danger">{errors?.province?.message}</p>

        <select
          name="district"
          id="district"
          className="form-control mt-2"
          {...register("district")}
          onChange={(e) => dispatch(setDistrictCode(e.target.value))}
        >
          <option value="" selected disabled>
            Chọn quận huyện*
          </option>
          {districts.districts?.map((item) => {
            return (
              <option key={item.code} value={item.code}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <p className="m-0 text-danger">{errors?.district?.message}</p>

        <select
          name="ward"
          id="ward"
          className="form-control mt-2"
          {...register("ward")}
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
