import axios from "axios";
export const guidanceApi = {
  getAllGuidance: async () => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}guidance`);
    return response;
  },
};
