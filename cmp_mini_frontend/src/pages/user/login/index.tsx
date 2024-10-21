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
import { getTopSafeArea, getMenuSafeArea } from "@/utils/systemInfo";
export default function Login() {
  const menuHeight = getMenuSafeArea();
  const currentUser = useSelector((state: any) => state.user.loginUser);

  const dispath = useDispatch();
  const doSubmit = async () => {
    let data = await dispath(userLogin() as any);
    if (data.code == 0) {
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
          <Text className="title">青白江xxx副食店</Text>
          <Form
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
                  提交
                </Button>
              </>
            }
          >
            <Form.Item align="center" required label="账号" name="userAccount">
              <Input
                className="login-input"
                placeholder="请输入账号"
                type="text"
              />
            </Form.Item>
            <Form.Item align="center" required label="密码" name="userPassword">
              <Input
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
