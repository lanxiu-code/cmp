import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const userLogin = () => {
  return async (dispatch) => {
    let data = {
      code: 0,
      token: "ASDFSDFS",
      message: "登录成功",
    };
    dispatch(setToken(data.token));
    return data;
  };
};
export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    loginUser: {
      userName: "未登录",
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setToken } = userSlice.actions;

export default userSlice.reducer;
