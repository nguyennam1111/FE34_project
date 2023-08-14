import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAccountApi } from "../../../apis/userAccountApi";
import { ROUTES } from "../../../constants/routes";

const initialState = {
  userAccounts: [],
  userAccountDetail: [],
  existEmailError: null,

  callbackURL: ROUTES.HOME,
};

export const actFetchAllUserAccounts = createAsyncThunk(
  "userAccounts/fetchAlluserAccounts",
  async () => {
    const { data } = await userAccountApi.getAllUserAccounts();

    return data;
  }
);
export const actAddUserAccount = createAsyncThunk(
  "userAccounts/addUserAccount",

  async (item, thunkAPI) => {
    const userAccounts = (await userAccountApi.getAllUserAccounts()).data;

    try {
      const existUser = userAccounts.find((user) => user.email === item.email);

      if (existUser) {
        throw new Error(
          "Email đã tồn tại, vui lòng nhập email khác hoặc đăng nhập bằng email này"
        );
      } else return await userAccountApi.addUserAccount(item);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
export const actGetUserAccountbyId = createAsyncThunk(
  "userAccount/actGetUserAccountbyId",
  async (id) => {
    return await userAccountApi.getUserAccountbyId(id);
  }
);

export const actUpdateUserAccount = createAsyncThunk(
  "userAccount/actUpdateUserAccount",
  async (item) => {
    return await userAccountApi.updateUserAccount(item.id, item.formData);
  }
);

export const userAccountSlice = createSlice({
  name: "userAccounts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actAddUserAccount.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actAddUserAccount.rejected, (state, action) => {
      state.existEmailError = action.payload;
    });
    builder.addCase(actAddUserAccount.fulfilled, (state, action) => {
      state.existEmailError = null;
    });
    // getAllUerAccount
    builder.addCase(actFetchAllUserAccounts.fulfilled, (state, action) => {
      state.userAccounts = action.payload;
    });

    // get user byId
    builder.addCase(actGetUserAccountbyId.fulfilled, (state, action) => {
      state.userAccountDetail = action.payload;
    });
    // update userAccount
    builder.addCase(actUpdateUserAccount.pending, (state, action) => {
      console.log(action.payload, "pending");
    });
    builder.addCase(actUpdateUserAccount.rejected, (state, action) => {
      console.log(action.payload, "rejected");
    });
    builder.addCase(actUpdateUserAccount.fulfilled, (state, action) => {
      console.log(action.payload, "fullfill");
    });
  },
});
export const { addUserAccount } = userAccountSlice.actions;
export default userAccountSlice.reducer;
