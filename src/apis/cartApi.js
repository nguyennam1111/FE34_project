import axios from "axios";
export const cartApi = {
  getAllCartItems: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}cart`, {
      params: {
        _sort: "id",
        _order: "desc",
        ...params,
      },
    });
    return response.data;
  },
  addCartItem: async (item) => {
    const data = await axios.post(`${process.env.REACT_APP_BE_URL}cart`, item);
    return data;
  },
  getCartItembyId: async (id) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BE_URL}cart/${id}`
    );
    return data;
  },
  removeCartItembyId: async (id) => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BE_URL}cart/${id}`
    );
    return data;
  },
  updateCartItem: async (id) => {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BE_URL}cart/${id}`
    );
    return data;
  },
};
