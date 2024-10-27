import { AddressControllerService } from "@/servers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { current, pageSize } from "@/constants";
// 查询地址
export const getAddressList = () => {
  return async (dispatch) => {
    const res = await AddressControllerService.listMyAddressVoByPageUsingPost({
      current,
      pageSize,
    });
    dispatch(setAddressList(res?.data?.records));
    return res;
  };
};
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
    ],
  },
  reducers: {
    setAddressList: (state, action) => {
      state.addressList = action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setAddressList } = addressSlice.actions;

export default addressSlice.reducer;
