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
  addDataToProduct: async (updateId, updateItem) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BE_URL}products/${updateId}`,
        updateItem
      );
    } catch (error) {
      console.log(error);
    }
  },
};
