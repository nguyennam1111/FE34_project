import axios from "axios";
export const productsApi = {
  getAllProducts: async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}products`,
      {
        params: {
          ...params,
        },
      }
    );
    return response;
  },
  getProductbyId: async (productId) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BE_URL}products/${productId}`
    );
    return data;
  },
  updateProduct: async (updateId, updateItem) => {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BE_URL}products/${updateId}`,
      updateItem
    );
    return data;
  },
};
