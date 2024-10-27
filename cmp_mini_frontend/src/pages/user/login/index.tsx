import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import {
  ConfigProvider,
  Form,
  Input,
  Button,
  Row,
  Col,
} from "@nutui/nutui-react-taro";
import { useSelector, useDispatch } from "react-redux";
import "./index.scss";
import { userLogin } from "@/store/user";
import theme from "./customTheme";
import { getMenuSafeArea } from "@/utils/systemInfo";
import { title } from "@/constants";
import { useState } from "react";
import { UserLoginRequest } from "@/servers";
export default function Login() {
  const menuHeight = getMenuSafeArea();
  const [loginData, setLoginData] = useState<UserLoginRequest>({
    userAccount: "lanxiu",
    userPassword: "12345678",
  });
  const dispath = useDispatch();
  const doSubmit = async () => {
    const res = await dispath(userLogin(loginData) as any);
    if (res.code == 0) {
      Taro.switchTab({
        url: "/pages/shop/index",
      });
    }
  };
  return (
    <ConfigProvider theme={theme}>
      <Row
        type="flex"
        align="center"
        style={{
          transform: `translateY(${menuHeight})`,
          height: `calc(90vh - ${menuHeight})`,
        }}
        className="loginPage"
      >
        <Col span={24}>
          <Text className="title">{title}</Text>
          <Form
            initialValues={loginData}
            labelPosition="right"
            footer={
              <>
                <Button
                  nativeType="submit"
                  className="login-btn"
                  block
                  onClick={doSubmit}
                  type="info"
                >
                  登录
                </Button>
              </>
            }
          >
            <Form.Item align="center" required label="账号" name="userAccount">
              <Input
                value={loginData?.userAccount}
                onChange={(val) =>
                  setLoginData({ ...loginData, userAccount: val })
                }
                className="login-input"
                placeholder="请输入账号"
                type="text"
              />
            </Form.Item>
            <Form.Item align="center" required label="密码" name="userPassword">
              <Input
                value={loginData?.userPassword}
                onChange={(val) =>
                  setLoginData({ ...loginData, userPassword: val })
                }
                type="password"
                className="login-input"
                placeholder="请输入密码"
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </ConfigProvider>
  );
}
