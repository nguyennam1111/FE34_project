import axios from "axios";
export const saleStatusApi = {
  getAllSaleStatus: async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}saleStatus`,
      {
        params: {
          ...params,
        },
      }
    );
    return response;
  },
};
