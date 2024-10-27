import { CartsVO } from "@/servers";

// 计算购物车总价
export const calcCartPrice = (shopCartList: CartsVO[]) => {
  let totalPrice = 0;
  shopCartList.forEach((cart: CartsVO) => {
    totalPrice +=
      (cart.goods?.price as number) * (cart.goods?.quantity as number);
  });
  return totalPrice;
};

// 获取购物车数量
export const calcCartCount = (shopCartList: CartsVO[]) => {
  let totalNum = 0;
  shopCartList.forEach((cart: CartsVO) => {
    totalNum += cart.goods?.quantity as number;
  });
  return totalNum;
};
