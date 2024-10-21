import { Button, Cell, Col, Price, Row, Space } from "@nutui/nutui-react-taro";
import "./index.scss";
import { Text } from "@tarojs/components";
import { useSelector } from "react-redux";
import { calcCartPrice } from "@/utils/cartUtil";

export default function SettleBar() {
  const shopCartList = useSelector((state: any) => state.shopCart.shopCartList);
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
        <Button size="large" type="primary">
          确认支付
        </Button>
      </Col>
    </Row>
  );
}
