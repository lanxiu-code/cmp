import { GoodsVO } from "./../servers/models/GoodsVO";
import { CartsControllerService, CartsEditRequest, CartsVO } from "@/servers";
import { createSlice } from "@reduxjs/toolkit";
import { CURRENT, PAGE_SIZE } from "@/constants";

import { ResponseCode } from "@/servers/core/request";
import Taro from "@tarojs/taro";
import { buildCartsVO } from "@/adapter/CartsAdapter";
// 获取购物车列表
export const getCartsList = () => {
  return async (dispatch) => {
    const res = await CartsControllerService.listMyCartsVoByPageUsingPost({
      current: CURRENT,
      pageSize: PAGE_SIZE,
    });
    dispatch(setShopCarts(res?.data?.records));
    return res;
  };
};
// 添加购物车
export const addCartsGoods = (goods: GoodsVO) => {
  return async (dispatch) => {
    const res = await CartsControllerService.addCartsUsingPost({
      goodsId: goods.id,
      quantity: goods.quantity,
    });
    if (res.code == ResponseCode.SUCCESS) {
      dispatch(addShopCarts(buildCartsVO(res.data, goods)));
      // 更新购物车列表
      // const newCarts =
      //   await CartsControllerService.listMyCartsVoByPageUsingPost({
      //     current,
      //     pageSize,
      //   });
      //dispatch(addShopCart(newCarts?.data?.records));
    } else {
      Taro.showToast({
        title: res.message,
        icon: "none",
      });
    }
    return res;
  };
};
// 清空购物车
export const clearCartsList = () => {
  return async (dispatch) => {
    const res = await CartsControllerService.clearCartsUsingPost();
    dispatch(clearShopCarts());
    return res;
  };
};
// 更新购物车
export const updateCartsList = (data: CartsEditRequest) => {
  return async (dispatch) => {
    const res = await CartsControllerService.editCartsUsingPost(data);
    dispatch(updateShopCarts(data));
    return res;
  };
};
// 删除购物车某项
export const deleteCarts = (id: number) => {
  return async (dispatch) => {
    const res = await CartsControllerService.deleteCartsUsingPost({ id });
    await dispatch(getCartsList());
    return res;
  };
};
export const shopCartSlice = createSlice({
  name: "shopCart",
  initialState: {
    shopCartList: [] as CartsVO[],
  },
  reducers: {
    setShopCarts: (state, action) => {
      state.shopCartList = action.payload;
    },
    addShopCarts: (state, action) => {
      const index = state.shopCartList.findIndex(
        (carts) => carts.id == action.payload.id
      );
      if (index >= 0) {
        const item = state.shopCartList[index];
        state.shopCartList.splice(index, 1, {
          ...item,
          goods: {
            ...item.goods,
            quantity: action.payload?.goods?.quantity + item.goods?.quantity,
          },
        });
      } else {
        state.shopCartList.push(action.payload);
      }
    },
    updateShopCarts: (state, action) => {
      const index = state.shopCartList.findIndex(
        (carts) => carts.id == action.payload.id
      );
      const item = state.shopCartList[index];
      state.shopCartList.splice(index, 1, {
        ...item,
        goods: { ...item.goods, quantity: action.payload.quantity },
      });
    },
    clearShopCarts: (state) => {
      state.shopCartList = [];
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { addShopCarts, clearShopCarts, setShopCarts, updateShopCarts } =
  shopCartSlice.actions;

export default shopCartSlice.reducer;
