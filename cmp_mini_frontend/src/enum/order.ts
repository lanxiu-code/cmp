enum OrderType {
  待完成,
  已完成,
  已取消,
}
export class OrderStatus {
  // 全部
  static ALL = "-1";
  // 待完成
  static WAIT = "0";
  // 已完成
  static SUCCESS = "1";
  // 已取消
  static CANCEL = "2";
}
export default OrderType;
