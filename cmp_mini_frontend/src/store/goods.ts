import { GoodsControllerService } from "@/servers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { current, pageSize } from "@/constants";
export const getGoodsList = (categoryId) => {
  return async (dispatch) => {
    const res = await GoodsControllerService.listGoodsVoByPageUsingPost({
      categoryId,
      current,
      pageSize,
    });
    // dispatch(setGoodsList(res?.data?.records));
    dispatch(
      setGoodsMap({
        categoryId,
        goodsList: res?.data?.records,
      })
    );
    return res;
  };
};
export const goodsSlice = createSlice({
  name: "goods",
  initialState: {
    goodsList: [],
    goodsMap: {},
  },
  reducers: {
    setGoodsList: (state, action) => {
      state.goodsList = action.payload;
    },
    setGoodsMap: (state, action) => {
      state.goodsMap[action.payload.categoryId] = action.payload.goodsList;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setGoodsList, setGoodsMap } = goodsSlice.actions;

export default goodsSlice.reducer;
