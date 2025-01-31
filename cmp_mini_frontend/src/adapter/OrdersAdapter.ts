import { CartsVO, OrderGoodsAdd } from "@/servers";

// 构建添加订单商品列表
export const buildOrderGoodsAddList = (
  shopCartList: CartsVO[]
): OrderGoodsAdd[] => {
  return shopCartList.map((item: CartsVO) => {
    return {
      goodsId: item.goods?.id,
      quantity: item.goods?.quantity,
      price: item.goods?.price,
    };
  });
};
