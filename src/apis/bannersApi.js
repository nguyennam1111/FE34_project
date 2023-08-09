import axios from "axios";
export const bannersApi = {
  getAllBanners: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}banners`);
    return response;
  },
};
