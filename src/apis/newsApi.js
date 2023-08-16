import axios from "axios";
export const newsApi = {
  getAllNews: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}news`);
    return response;
  },
};
