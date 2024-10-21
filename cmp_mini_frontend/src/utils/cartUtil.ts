// 计算购物车总价
export const calcCartPrice = (shopCartList: any) => {
  let totalPrice = 0;
  shopCartList.forEach((item: any) => {
    totalPrice += item.price * item.count;
  });
  return totalPrice;
};
