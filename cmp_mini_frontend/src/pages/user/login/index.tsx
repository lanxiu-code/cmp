import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import {
  ConfigProvider,
  Form,
  Input,
  Button,
  Row,
  Col,
  Tabs,
  Space,
  Image,
} from "@nutui/nutui-react-taro";
import { useSelector, useDispatch } from "react-redux";
import "./index.scss";
import { userLogin } from "@/store/user";
import theme from "./customTheme";
import { getMenuSafeArea } from "@/utils/systemInfo";
import { CAPTCHA_URL, TITLE } from "@/constants";
import { useState } from "react";
import { UserLoginRequest } from "@/servers";
import PasswordLogin from "../components/PasswordLogin";
import PhoneLogin from "../components/PhoneLogin";
export default function Login() {
  const menuHeight = getMenuSafeArea();
  const [flag, setFlag] = useState(false);
  const [loginData, setLoginData] = useState<UserLoginRequest>({
    userAccount: "",
    userPassword: "",
    captcha: "",
  });
  const dispath = useDispatch();
  const doSubmit = async (data: UserLoginRequest) => {
    const res = await dispath(userLogin(data) as any);
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
          <Text className="title">{TITLE}</Text>
          {!flag && <PasswordLogin loginData={loginData} doSubmit={doSubmit} />}
          {flag && <PhoneLogin loginData={loginData} doSubmit={doSubmit} />}

          <View
            style={{ textAlign: "end", fontSize: "15px", margin: "0 10px" }}
          >
            {!flag && <Text onClick={() => setFlag(true)}>验证码登录</Text>}
            {flag && <Text onClick={() => setFlag(false)}>密码登录</Text>}
          </View>
        </Col>
      </Row>
    </ConfigProvider>
  );
}
