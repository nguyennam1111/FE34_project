import axios from "axios";
export const ordersRecordApi = {
  addOrder: async (item) => {
    const data = await axios.post(
      `${process.env.REACT_APP_BE_URL}orders`,
      item
    );
    return data;
  },
  getAllOrders: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}orders`, {
      params: {
        _sort: "id",
        _order: "desc",
        ...params,
      },
    });
    return response;
  },
};
