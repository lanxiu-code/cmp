import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [
      {
        id: 1,
        type: 0,
        name: "商品1",
        price: 100,
        count: 1,
        total: 100,
        remark: "备注1",
        createTime: "2021-08-01 12:00:00",
        img: "//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
      },
      {
        id: 2,
        type: 0,
        name: "商品1",
        price: 100,
        count: 1,
        total: 100,
        remark: "备注1",
        createTime: "2021-08-02 12:00:00",
        img: "//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
      },
      {
        id: 3,
        type: 1,
        name: "商品1",
        price: 100,
        count: 1,
        total: 100,
        remark: "备注1",
        createTime: "2021-08-03 12:00:00",
        img: "//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
      },
    ],
  },
  reducers: {},
});
// 每个 case reducer 函数会生成对应的 Action creators
// export const { setToken } = goodsSlice.actions;

export default orderSlice.reducer;
