import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressList: [
      {
        id: 1,
        addressDetail: "xxxx街道",
        cityName: "次渠镇",
        countyName: "通州区",
        provinceName: "北京市",
        selectedAddress: true,
        townName: "拉萨",
        name: "李四",
        phone: "12345678901",
      },
      {
        id: 2,
        addressDetail: "xxxx街道",
        cityName: "次渠镇",
        countyName: "通州区",
        provinceName: "北京市",
        selectedAddress: false,
        townName: "",
        name: "探探鱼1",
        phone: "12345678901",
      },
      {
        id: 3,
        addressDetail: "xxxx街道",
        cityName: "次渠镇",
        countyName: "通州区",
        provinceName: "北京市",
        selectedAddress: false,
        townName: "",
        name: "张三",
        phone: "12345678901",
      },
    ],
  },
  reducers: {},
});
// 每个 case reducer 函数会生成对应的 Action creators
// export const { setToken } = goodsSlice.actions;

export default addressSlice.reducer;
