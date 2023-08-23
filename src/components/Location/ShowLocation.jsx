import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actGetAllDistrict,
  actGetAllProvince,
  actGetAllWard,
} from "../../redux/feature/Location/getLocationSlice";

const ShowLocation = (props) => {
  const dispatch = useDispatch();
  const { isAuth, userProfile } = useSelector((state) => state.auth);
  const { provinces, districts, wards } = useSelector(
    (state) => state.location
  );

  const provinceCode = props.watch("province");
  const districtCode = props.watch("district");
  const ward = props.watch("ward");

  useEffect(() => {
    dispatch(actGetAllProvince());
    dispatch(actGetAllDistrict(provinceCode));
    dispatch(actGetAllWard(districtCode));
  }, [provinceCode, districtCode]);

  useEffect(() => {
    if (provinceCode !== userProfile.province) {
      props.setValue("district", "");
      props.setValue("ward", "");
    }
  }, [provinceCode]);
  useEffect(() => {
    if (districtCode !== userProfile.district) {
      props.setValue("ward", "");
    }
  }, [districtCode]);
  useEffect(() => {
    if (isAuth) {
      props.setValue("province", userProfile.province);
      props.setValue("district", userProfile.district);
      props.setValue("ward", userProfile.ward);
    }
  }, [isAuth]);

  districts.districts?.map((item) =>
    item.code == districtCode ? props.setDistrictName(item.name) : ""
  );
  provinces?.map((item) =>
    item.code == provinceCode ? props.setProvinceName(item.name) : ""
  );
  const renderLocation = (register, errors, editUser, userProfile, isAuth) => {
    return (
      <>
        <select
          {...register("province")}
          name="province"
          id="province"
          className="form-control mt-2"
          defaultValue={isAuth ? userProfile.province : ""}
          value={provinceCode}
          onChange={(e) => {
            props.setValue("province", e.target.value);
          }}
        >
          <option value={""} selected disabled>
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
          {...register("district")}
          name="district"
          id="district"
          className="form-control mt-2"
          defaultValue={isAuth ? userProfile.district : ""}
          value={districtCode}
          onChange={(e) => {
            props.setValue("district", e.target.value);
          }}
        >
          <option value={""} selected disabled>
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
          {...register("ward")}
          name="ward"
          id="ward"
          className="form-control mt-2"
          defaultValue={isAuth ? userProfile.ward : ""}
          value={ward}
          onChange={(e) => {
            props.setValue("ward", e.target.value);
          }}
        >
          <option value={""} selected disabled>
            Chọn phường xã*
          </option>
          {wards.wards?.map((item) => {
            return (
              <option key={item.code} value={item.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <p className="m-0 text-danger">{errors?.ward?.message}</p>
      </>
    );
  };

  return (
    <>
      {renderLocation(
        props.register,
        props.errors,
        props.editUser,
        userProfile,
        isAuth
      )}
    </>
  );
};

export default ShowLocation;
