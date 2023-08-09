import axios from "axios";
export const logosApi = {
  getAllLogos: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}logos`);
    return response;
  },
};
