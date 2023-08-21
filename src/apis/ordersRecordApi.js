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
        _sort: "orderAt",
        _order: "desc",

        ...params,
      },
    });
    return response;
  },
  getOrderbyUserName: async (params, userName) => {
    const data = await axios.get(
      `${process.env.REACT_APP_BE_URL}orders/${userName}`,
      {
        params: {
          _sort: "createdAt",
          _order: "desc",

          ...params,
        },
      }
    );
    return data;
  },
};
