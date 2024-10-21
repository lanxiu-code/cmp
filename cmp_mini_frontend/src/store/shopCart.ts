import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const shopCartSlice = createSlice({
  name: "shopCart",
  initialState: {
    shopCartList: [
      {
        id: 1,
        name: "蜜桃四季春",
        price: 10,
        count: 100,
        img: "//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
      },
      {
        id: 2,
        name: "蜜桃四季春",
        price: 12.4,
        count: 1,
        img: "//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
      },
      {
        id: 3,
        name: "蜜桃四季春",
        price: 1.5,
        count: 8,
        img: "//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
      },
    ],
  },
  reducers: {
    addShopCart: (state, action) => {
      state.shopCartList.push(action.payload);
    },
    removeShopCart: (state, action) => {
      state.shopCartList.splice(action.payload, 1);
    },
    updateShopCart: (state, action) => {
      state.shopCartList[action.payload.index].count = action.payload.count;
    },
    clearShopCart: (state) => {
      state.shopCartList = [];
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { addShopCart, removeShopCart, updateShopCart, clearShopCart } =
  shopCartSlice.actions;

export default shopCartSlice.reducer;
