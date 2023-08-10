import axios from "axios";
export const serviceApi = {
  getAllBanners: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}service`);
    return response;
  },
};
