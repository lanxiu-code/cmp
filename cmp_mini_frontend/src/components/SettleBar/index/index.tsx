import { Button, Cell, Col, Price, Row, Space } from "@nutui/nutui-react-taro";
import "./index.scss";
import { Text } from "@tarojs/components";
import { useDispatch, useSelector } from "react-redux";
import { calcCartPrice } from "@/utils/cartUtil";
import { OrdersAddRequest } from "@/servers";
import { createOrders } from "@/store/order";
import { ResponseCode } from "@/servers/core/request";
import Taro from "@tarojs/taro";
import { clearCartsList } from "@/store/shopCart";
interface Props {
  data: OrdersAddRequest;
}
export default function SettleBar(props: Props) {
  const shopCartList = useSelector((state: any) => state.shopCart.shopCartList);
  const dispatch = useDispatch();
  const doPay = async () => {
    if (!props.data.addressId) {
      Taro.showToast({
        title: "请选择收货地址",
        icon: "none",
      });
      return;
    }
    // todo 微信支付
    // 模拟成功支付
    Taro.showLoading({
      title: "支付中",
    });
    setTimeout(async () => {
      const res = await dispatch(createOrders(props?.data) as any);
      if (res.code == ResponseCode.SUCCESS) {
        // 清空购物车
        await dispatch(clearCartsList() as any);
        Taro.hideLoading();
        Taro.navigateTo({
          url: "/pages/shop/result/index?orderNo=" + res.data,
        });
      }
    }, 2000);
  };
  return (
    <Row
      className="settleBar"
      type="flex"
      align="center"
      justify="space-between"
    >
      <Col span={10}>
        <Space align="center">
          <Text>实付:</Text>
          <Price price={calcCartPrice(shopCartList)} size="normal" thousands />
        </Space>
      </Col>
      <Col span={10} className="flex-end">
        <Button onClick={doPay} size="large" type="primary">
          确认支付
        </Button>
      </Col>
    </Row>
  );
}
