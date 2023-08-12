import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactApi } from "../../../apis/contactApi";

const initialState = {
  contact: [],
  errors: {},
};
export const actGetContact = createAsyncThunk(
  "contact/fetchAllcontact",
  async () => {
    const { data } = await contactApi.getContactInfor();

    return data;
  }
);
export const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetContact.pending, (state, action) => {
      console.log();
    });
    builder.addCase(actGetContact.rejected, (state, action) => {
      state.errors = {};
    });
    builder.addCase(actGetContact.fulfilled, (state, action) => {
      state.contact = action.payload;
    });
  },
});
export const {} = contactSlice.actions;
export default contactSlice.reducer;
