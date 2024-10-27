import { OrderStatus } from "@/enum/order";
import { current, pageSize } from "./../constants/index";
import { OrdersAddRequest, OrdersControllerService, OrdersVO } from "@/servers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 创建订单
export const createOrders = (data: OrdersAddRequest) => {
  return async (dispatch) => {
    const res = await OrdersControllerService.addOrdersUsingPost(data);
    dispatch(addOrders(data));
    return res;
  };
};
// 查询订单列表
export const getOrdersList = (
  current = 1,
  pageSize = 10,
  status = OrderStatus.ALL
) => {
  return async (dispatch) => {
    const res = await OrdersControllerService.listMyOrdersVoByPageUsingPost({
      current,
      pageSize,
      status: status == OrderStatus.ALL ? null : (status as any) * 1,
    });
    dispatch(setOrdersList(res?.data?.records));
    return res;
  };
};
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [] as OrdersVO[],
  },
  reducers: {
    setOrdersList: (state, action) => {
      state.orderList = action.payload;
    },
    addOrders: (state, action) => {
      state.orderList.push(action.payload);
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { addOrders, setOrdersList } = orderSlice.actions;

export default orderSlice.reducer;
