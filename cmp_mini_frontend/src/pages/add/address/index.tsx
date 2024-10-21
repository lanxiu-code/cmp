import CustomBar from "@/components/CustomBar/index";
import "./index.scss";
import {
  Button,
  Cell,
  ConfigProvider,
  Form,
  Input,
  Row,
  TextArea,
} from "@nutui/nutui-react-taro";
import { Text, View } from "@tarojs/components";
import customTheme from "./customTheme";
import { useState } from "react";
export default function AddAddress() {
  const [detailAddress, setDetailAddress] = useState("");
  return (
    <ConfigProvider className="addAddressPage col" theme={customTheme}>
      <CustomBar customTitle="新增地址" showBack />
      <View className="content">
        <Cell radius={10}>
          <Form
            labelPosition="right"
            style={{ width: "100%" }}
            footer={
              <>
                <Button
                  nativeType="submit"
                  className="login-btn"
                  block
                  type="info"
                >
                  保存
                </Button>
              </>
            }
          >
            <Form.Item align="center" required label="收件人" name="sendTo">
              <Input
                className="login-input"
                placeholder="收件人名字"
                type="text"
              />
            </Form.Item>
            <Form.Item align="center" required label="手机号" name="phone">
              <Input
                className="login-input"
                placeholder="手机号"
                type="number"
              />
            </Form.Item>
            <Form.Item
              align="center"
              required
              label="详情地址"
              name="DetailAddress"
            >
              <TextArea
                autoSize
                className="textarea"
                value={detailAddress}
                placeholder="省、市、县、区、街道"
                onChange={(value) => setDetailAddress(value)}
              />
            </Form.Item>
          </Form>
        </Cell>
      </View>
    </ConfigProvider>
  );
}
