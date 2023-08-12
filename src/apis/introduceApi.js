import axios from "axios";
export const introduceApi = {
  getIntroduce: async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}introduce`
    );
    return response;
  },
};
