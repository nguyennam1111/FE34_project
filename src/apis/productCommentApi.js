import axios from "axios";
export const productCommentApi = {
  addComment: async (item) => {
    const data = await axios.post(
      `${process.env.REACT_APP_BE_URL}productComments`,
      item
    );
    return data;
  },
  getAllComments: async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}productComments`,
      {
        params: {
          _sort: "id",
          _order: "desc",
          ...params,
        },
      }
    );
    return response.data;
  },
  updateComment: async (id, item) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BE_URL}productComments/${id}`,
        item
      );
    } catch (error) {
      console.log((error, "error put comment in api"));
    }
  },
  getProductCommentById: async (productId) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BE_URL}productComments/${productId}`
    );
    return data;
  },
};
