import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const goodsSlice = createSlice({
  name: "goods",
  initialState: {
    goodsList: [
      {
        id: 1,
        name: "商品1",
        price: 10,
        count: 1,
        img: "//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
        desc: "商品描述1",
        selected: false,
      },
    ],
  },
  reducers: {},
});
// 每个 case reducer 函数会生成对应的 Action creators
// export const { setToken } = goodsSlice.actions;

export default goodsSlice.reducer;
