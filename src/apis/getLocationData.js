import axios from "axios";
export const getLocationData = {
  getProvince: async (params) => {
    const response = await axios.get(
      `https://provinces.open-api.vn/api/?depth=1`,
      {
        params: {
          _sort: "id",
          _order: "desc",
          ...params,
        },
      }
    );
    return response;
  },
  getDistrict: async (code) => {
    const response = await axios.get(
      `https://provinces.open-api.vn/api/p/${code}?depth=2`,
      {
        params: {
          _sort: "id",
          _order: "desc",
        },
      }
    );
    return response;
  },
  getWard: async (code) => {
    const response = await axios.get(
      `https://provinces.open-api.vn/api/d/${code}?depth=2`,
      {
        params: {
          _sort: "id",
          _order: "desc",
        },
      }
    );
    return response;
  },
};
