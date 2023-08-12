import axios from "axios";
export const contactApi = {
  getContactInfor: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}contact`);
    return response;
  },
};
