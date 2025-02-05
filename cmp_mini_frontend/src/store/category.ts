import { CategoryControllerService } from "@/servers";
import { createSlice } from "@reduxjs/toolkit";
import { CURRENT, PAGE_SIZE } from "@/constants";
export const getCategoryList = () => {
  return async (dispatch) => {
    const res = await CategoryControllerService.listCategoryVoByPageUsingPost({
      current: CURRENT,
      pageSize: PAGE_SIZE,
    });
    dispatch(setCategoryList(res?.data?.records));
    return res;
  };
};
export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
  },
  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setCategoryList } = categorySlice.actions;

export default categorySlice.reducer;
