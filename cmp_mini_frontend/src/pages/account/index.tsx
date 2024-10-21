import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import {
  Avatar,
  Cell,
  Col,
  ConfigProvider,
  Image,
  Row,
} from "@nutui/nutui-react-taro";
import CustomBar from "@/components/CustomBar/index";
import customTheme from "./customTheme";
import { ArrowRight } from "@nutui/icons-react-taro";
export default function Account() {
  return (
    <ConfigProvider className="accountPage" theme={customTheme}>
      <CustomBar />
      <View className="top">
        <Row type="flex" className="avatar" justify="center" align="center">
          <Col span={8} className="align-center col">
            <Avatar
              size="large"
              src="https://img2.baidu.com/it/u=4285632301,4191799154&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1729443600&t=ce8c8635f4ee0a4c42e31874418aed07"
            />
            <View>19937693246</View>
          </Col>
        </Row>
      </View>
      <View className="middle">
        <Cell.Group>
          <Cell
            clickable
            onClick={() =>
              Taro.navigateTo({
                url: "/pages/account/address/index",
              })
            }
            title="地址管理"
            extra={<ArrowRight />}
          />
          <Cell title="个人信息" extra={<ArrowRight />} />
        </Cell.Group>
      </View>
    </ConfigProvider>
  );
}
