import { IconFont } from "@nutui/icons-react-taro";
import "./index.scss";
import {
  Button,
  Col,
  ConfigProvider,
  Row,
  Space,
} from "@nutui/nutui-react-taro";
import { Text, View } from "@tarojs/components";
import Taro, { useLoad, useRouter } from "@tarojs/taro";

export default function Result() {
  const router = useRouter();
  useLoad(() => {
    if (!router.params.orderNo) {
      Taro.navigateBack();
    }
  });
  return (
    <ConfigProvider className="payResultPage">
      <View className="card">
        <Space direction="vertical">
          <Row type="flex" justify="center">
            <Col span={6}>
              <IconFont
                fontClassName="iconfont"
                classPrefix="icon"
                color="green"
                size={80}
                name="zhifuchenggong"
              />
            </Col>
          </Row>
          <View className="title">支付成功</View>
          <View className="desc">感谢您的购买,您的订单已经确认。</View>
          <View className="info">
            <Space direction="vertical" style={{ fontSize: "15px" }}>
              <Text>订单号</Text>
              <Text>{router.params.orderNo}</Text>
            </Space>
          </View>
          <Button
            onClick={() => Taro.switchTab({ url: "/pages/shop/index" })}
            block
            color="black"
            size="large"
          >
            返回首页
          </Button>
        </Space>
      </View>
    </ConfigProvider>
  );
}
