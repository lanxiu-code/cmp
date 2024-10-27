import { UserControllerService, UserLoginRequest } from "@/servers";
import { LoginUserVO } from "./../servers/models/LoginUserVO";
import { createSlice } from "@reduxjs/toolkit";
import { ResponseCode } from "@/servers/core/request";
import Taro from "@tarojs/taro";
export const userLogin = (data: UserLoginRequest) => {
  return async (dispatch) => {
    const res = await UserControllerService.userLoginUsingPost(data);
    if (res.code == ResponseCode.SUCCESS) {
      Taro.setStorageSync("token", res.data.token);
      dispatch(setToken(res.data.token));
    }
    return res;
  };
};
export const getCurrentUser = () => {
  return async (dispatch) => {
    const res = await UserControllerService.getLoginUserUsingGet();
    await dispatch(setUserInfo(res.data as LoginUserVO));
    return res;
  };
};
export const userLogout = () => {
  return async (dispatch) => {
    const res = await UserControllerService.userLogoutUsingPost();
    await dispatch(clearUserInfo());
    Taro.reLaunch({ url: "/pages/user/login/index" });
    return res;
  };
};
export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    userInfo: {} as LoginUserVO,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.token = "";
      state.userInfo = {} as LoginUserVO;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setToken, setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
