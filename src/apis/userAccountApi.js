import axios from "axios";
export const userAccountApi = {
  getAllUserAccounts: async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}userAccounts`,
      {
        params: {
          _sort: "id",
          _order: "desc",
          ...params,
        },
      }
    );
    return response;
  },

  addUserAccount: async (item) => {
    try {
      await axios.post(`${process.env.REACT_APP_BE_URL}userAccounts`, item);
    } catch (error) {
      console.log(error, "error api");
    }
  },
  getUserAccountbyId: async (id) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BE_URL}userAccounts/${id}`
    );
    return data;
  },
  removeUserAccountId: async (id) => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BE_URL}userAccounts/${id}`
    );
    return data;
  },
  updateUserAccount: async (id, updateItem) => {
    const { respond } = await axios.patch(
      `${process.env.REACT_APP_BE_URL}userAccounts/${id}`,
      updateItem
    );
    return respond;
  },
};
