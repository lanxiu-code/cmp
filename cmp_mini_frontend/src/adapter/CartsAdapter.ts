import { GoodsVO } from "@/servers";

// 商品转购物车对象
export const buildCartsVO = (id: number | string, goods: GoodsVO) => {
  return {
    id,
    goods,
  };
};
