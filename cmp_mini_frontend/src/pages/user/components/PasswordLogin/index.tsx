import "./index.scss";
import { Button, Form, Image, Input, Row } from "@nutui/nutui-react-taro";
import { CAPTCHA_URL } from "@/constants";
import { useState } from "react";
import { UserLoginRequest } from "@/servers";
import { Text, View } from "@tarojs/components";
interface Props {
  loginData: UserLoginRequest;
  doSubmit: (data: UserLoginRequest) => void;
}
export default function PasswordLogin(props: Props) {
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const [formRef] = Form.useForm();
  return (
    <View className="passwordLogin">
      <Form
        form={formRef}
        initialValues={props.loginData}
        labelPosition="top"
        footer={
          <>
            <Button
              nativeType="submit"
              className="login-btn"
              block
              onClick={() => props.doSubmit(props.loginData)}
              type="info"
            >
              登录
            </Button>
          </>
        }
      >
        <Form.Item required label="账号" name="userAccount">
          <Input
            value={props.loginData?.userAccount}
            onChange={(val) => {
              props.loginData.userAccount = val;
            }}
            className="login-input"
            placeholder="请输入账号"
            type="text"
          />
        </Form.Item>
        <Form.Item required label="密码" name="userPassword">
          <Input
            value={props.loginData?.userPassword}
            onChange={(val) => {
              props.loginData.userPassword = val;
            }}
            type="password"
            className="login-input"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Row type="flex" align="center" className="captcha">
          <Form.Item required label="验证码" name="captcha">
            <Input
              value={props.loginData?.captcha}
              onChange={(val) => {
                props.loginData.captcha = val;
              }}
              type="text"
              className="login-input"
              placeholder="请输入验证码"
            />
          </Form.Item>
          <Image
            onClick={() => setTimestamp(new Date().getTime())}
            width={80}
            height={40}
            src={CAPTCHA_URL + `?timestamp=${timestamp}`}
          />
        </Row>
      </Form>
    </View>
  );
}
