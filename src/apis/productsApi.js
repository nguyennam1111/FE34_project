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
  updateProductStatus: async (updateId, updateItem) => {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BE_URL}products/${updateId}`,
      updateItem
    );
    return data;
  },

  createProduct: async (item) => {
    try {
      await axios.post(`${process.env.REACT_APP_BE_URL}products`, item);
    } catch (error) {
      console.log(error);
    }
  },
  removeProduct: async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BE_URL}products/${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  updateProductPrice: async (updateId, updateItem) => {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BE_URL}products/${updateId}`,
      updateItem
    );
    return data;
  },
  updateProductSaleQty: async (updateId, updateItem) => {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BE_URL}products/${updateId}`,
      updateItem
    );
    return data;
  },
};
