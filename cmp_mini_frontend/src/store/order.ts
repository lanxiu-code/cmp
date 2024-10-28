import { SORT_FIELD, SORT_ORDER_DESC } from "@/constants";
import { OrderStatus } from "@/enum/order";
import { OrdersAddRequest, OrdersControllerService, OrdersVO } from "@/servers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// 初始数据
const initialState = {
  ordersMap: {} as [key: string, value: OrdersVO],
};
// 创建订单
export const createOrders = (data: OrdersAddRequest) => {
  return async (dispatch) => {
    const res = await OrdersControllerService.addOrdersUsingPost(data);
    dispatch(setOrdersMap({ key: OrderStatus.WAIT, value: data }));
    return res;
  };
};
// 查询订单列表
export const getOrdersList = (
  current = 1,
  pageSize = 10,
  status = OrderStatus.ALL
) => {
  return async (dispatch, getState) => {
    const res = await OrdersControllerService.listMyOrdersVoByPageUsingPost({
      current,
      pageSize,
      sortField: SORT_FIELD,
      sortOrder: SORT_ORDER_DESC,
      status: status == OrderStatus.ALL ? null : (status as any) * 1,
    });
    dispatch(setOrdersMap({ key: status, value: res?.data?.records }));
    return res;
  };
};

// 清空订单数据，重新获取
export const refreshOrdersData = (
  current = 1,
  pageSize = 10,
  status = OrderStatus.ALL
) => {
  return async (dispatch, getState) => {
    const res = await OrdersControllerService.listMyOrdersVoByPageUsingPost({
      current,
      pageSize,
      sortField: SORT_FIELD,
      sortOrder: SORT_ORDER_DESC,
      status: status == OrderStatus.ALL ? null : (status as any) * 1,
    });
    dispatch(refreshOrdersMap({ key: status, value: res?.data?.records }));
    return res;
  };
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrdersMap: (state, action) => {
      const key = action.payload.key as string;
      const newValue = action.payload.value as OrdersVO[];
      if (!newValue.length) return;
      const oldValue = state.ordersMap[key];
      if (!oldValue) {
        state.ordersMap[key] = newValue;
      } else {
        state.ordersMap[key] = oldValue.concat(newValue);
      }
    },
    refreshOrdersMap: (state, action) => {
      const key = action.payload.key as string;
      const newValue = action.payload.value as OrdersVO[];
      state.ordersMap[key] = newValue;
    },
    clearOrdersMap: (state, action) => {
      Object.assign(state.ordersMap, {});
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setOrdersMap, refreshOrdersMap, clearOrdersMap } =
  orderSlice.actions;

export default orderSlice.reducer;
