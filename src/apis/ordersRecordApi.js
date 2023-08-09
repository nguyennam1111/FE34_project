import axios from "axios";
export const ordersRecordApi = {
  addOrder: async (item) => {
    const data = await axios.post(
      `${process.env.REACT_APP_BE_URL}orders`,
      item
    );
    return data;
  },
  getAllorders: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}orders`);
    return response;
  },
  getOrderbyId: async (productId) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BE_URL}orders/${productId}`
    );
    return data;
  },
};
