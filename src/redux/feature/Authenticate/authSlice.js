import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAccountApi } from "../../../apis/userAccountApi";
import { toast } from "react-toastify";
import { message } from "antd";

const initialState = {
  isAuth: JSON.parse(localStorage.getItem("isAuth")) ?? false,
  isForgot: JSON.parse(localStorage.getItem("isForgot")) ?? false,
  isChangePass: JSON.parse(localStorage.getItem("isChangePass")) ?? false,
  userProfile: JSON.parse(localStorage.getItem("userProfile")) ?? null,
  loginError: null,
};

export const actLogin = createAsyncThunk(
  "auth/actLogin",
  async (loginData, thunkAPI) => {
    const userAccounts = (await userAccountApi.getAllUserAccounts()).data;

    try {
      const mapUserAccount = userAccounts.find(
        (item) =>
          item.email == loginData.loginUser &&
          item.password == loginData.loginPassword
      );
      if (mapUserAccount) {
        return {
          userAccount: mapUserAccount,
          fullName: mapUserAccount.firstName + mapUserAccount.lastName,
        };
      } else throw new Error("Tên đăng nhập hoặc mật khẩu không đúng!");
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    setForgotPassword: (state, action) => {
      state.isForgot = action.payload;
      localStorage.setItem("isForgot", JSON.stringify(state.isForgot));
    },
    changePassword: (state, action) => {
      state.isChangePass = action.payload;
      localStorage.setItem("isChangePass", JSON.stringify(state.isChangePass));
    },
    logout: (state, action) => {
      state.isAuth = false;
      state.userProfile = "";
      state.loginError = null;
      localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
      localStorage.setItem("userProfile", JSON.stringify(state.userProfile));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state, action) => {});
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loginError = action.payload;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      const { userAccount, fullName } = action.payload;
      state.isAuth = true;
      state.loginError = null;
      state.userProfile = { ...userAccount, fullName };

      localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
      localStorage.setItem("userProfile", JSON.stringify(state.userProfile));
      toast.success("Login success!");
    });
    // builder.addCase(fetchAllUserAccounts.fulfilled, (state, action) => {
    //   state.userAccounts = action.payload;
    // });
  },
});
export const { loginSuccess, logout, setForgotPassword, changePassword } =
  authSlice.actions;
export default authSlice.reducer;
