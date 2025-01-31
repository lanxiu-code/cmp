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
export default function PhoneLogin(props: Props) {
  const [formRef] = Form.useForm();
  return (
    <View className="phoneLogin">
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
        <Form.Item required label="手机号" name="userAccount">
          <Input
            value={props.loginData?.userAccount}
            onChange={(val) => {
              props.loginData.userAccount = val;
            }}
            className="login-input"
            placeholder="请输入手机号"
            type="text"
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
          <Button>获取验证码</Button>
        </Row>
      </Form>
    </View>
  );
}
