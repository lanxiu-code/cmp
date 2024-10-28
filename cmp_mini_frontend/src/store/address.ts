import {
  AddressAddRequest,
  AddressControllerService,
  AddressEditRequest,
  AddressVO,
} from "@/servers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CURRENT, PAGE_SIZE } from "@/constants";
import Taro from "@tarojs/taro";
import { ResponseCode } from "@/servers/core/request";
// 查询地址
export const getAddressList = () => {
  return async (dispatch) => {
    const res = await AddressControllerService.listMyAddressVoByPageUsingPost({
      current: CURRENT,
      pageSize: PAGE_SIZE,
    });
    dispatch(setAddressList(res?.data?.records));
    return res;
  };
};
// 新增地址
export const addAddress = (address: AddressAddRequest) => {
  return async (dispatch) => {
    const res = await AddressControllerService.addAddressUsingPost(address);
    if (res.code == ResponseCode.SUCCESS) {
      address.id = res.data;
      dispatch(ADD_ADDRESS(address));
      Taro.showToast({ title: "添加成功", icon: "success" });
    }
    return res;
  };
};
// 编辑地址
export const editAddress = (address: AddressEditRequest) => {
  return async (dispatch) => {
    const res = await AddressControllerService.editAddressUsingPost(address);
    if (res.code == ResponseCode.SUCCESS) {
      dispatch(EDIT_ADDRESS(address));
      Taro.showToast({ title: "修改成功", icon: "success" });
    }
    return res;
  };
};
// 删除地址
export const deleteAddress = (id: number) => {
  return async (dispatch) => {
    const res = await AddressControllerService.deleteAddressUsingPost({
      id,
    });
    dispatch(removeAddress(id));
    return res;
  };
};
export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressList: [] as AddressVO[],
  },
  reducers: {
    setAddressList: (state, action) => {
      state.addressList = action.payload;
    },
    removeAddress: (state, action) => {
      state.addressList = state.addressList.filter(
        (item: AddressVO) => item.id != action.payload
      );
    },
    ADD_ADDRESS: (state, action) => {
      state.addressList.push(action.payload);
    },
    EDIT_ADDRESS: (state, action) => {
      state.addressList = state.addressList.map((item: AddressVO) => {
        if (item.id == action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setAddressList, removeAddress, ADD_ADDRESS, EDIT_ADDRESS } =
  addressSlice.actions;

export default addressSlice.reducer;
