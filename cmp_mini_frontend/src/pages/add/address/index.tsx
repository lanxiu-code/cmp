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
import { AddressAddRequest, AddressEditRequest, AddressVO } from "@/servers";
import Taro, { useLoad } from "@tarojs/taro";
import { useDispatch } from "react-redux";
import { addAddress, editAddress } from "@/store/address";
import { ResponseCode } from "@/servers/core/request";
interface Params {
  id?: number;
}
export default function AddAddress() {
  const [address, setAddress] = useState<AddressVO>();
  const [title, setTitle] = useState("新增地址");
  const [formRef] = Form.useForm();
  const dispatch = useDispatch();
  useLoad((params: Params) => {
    if (params.id) {
      setTitle("编辑地址");
      setAddress({ ...address, id: params.id });
    }
  });

  return (
    <ConfigProvider className="addAddressPage col" theme={customTheme}>
      <CustomBar customTitle={title} showBack />
      <View className="content">
        <Cell radius={10}>
          <Form
            form={formRef}
            onFinish={async (values) => {
              let res = null as any;
              if (address?.id) {
                res = await dispatch(
                  editAddress(values as AddressEditRequest) as any
                );
              } else {
                res = await dispatch(
                  addAddress(values as AddressAddRequest) as any
                );
              }
              if (res?.code == ResponseCode.SUCCESS) {
                formRef.resetFields();
                Taro.navigateBack();
              }
            }}
            onFinishFailed={() =>
              Taro.showToast({ title: "请填写完整信息", icon: "error" })
            }
            labelPosition="right"
            style={{ width: "100%" }}
            initialValues={address}
            footer={
              <>
                <Button
                  nativeType="submit"
                  className="address-btn"
                  block
                  type="info"
                >
                  保存
                </Button>
              </>
            }
          >
            <Form.Item
              rules={[{ required: true, message: "请输入收件人姓名" }]}
              align="center"
              required
              label="收件人"
              name="name"
            >
              <Input
                value={address?.name}
                onChange={(val) => setAddress({ ...address, name: val })}
                className="address-input"
                placeholder="收件人名字"
                type="text"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "请输入收件人电话" }]}
              align="center"
              required
              label="手机号"
              name="phone"
            >
              <Input
                value={address?.phone}
                onChange={(val) => setAddress({ ...address, phone: val })}
                className="address-input"
                placeholder="手机号"
                type="number"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "请输入省份" }]}
              align="center"
              required
              label="省"
              name="provinceName"
            >
              <Input
                value={address?.provinceName}
                onChange={(val) =>
                  setAddress({ ...address, provinceName: val })
                }
                className="address-input"
                placeholder="填写省份"
                type="text"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "请输入市" }]}
              align="center"
              required
              label="市"
              name="cityName"
            >
              <Input
                value={address?.cityName}
                onChange={(val) => setAddress({ ...address, cityName: val })}
                className="address-input"
                placeholder="市"
                type="text"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "请输入区" }]}
              align="center"
              required
              label="区"
              name="countyName"
            >
              <Input
                value={address?.countyName}
                onChange={(val) => setAddress({ ...address, countyName: val })}
                className="address-input"
                placeholder="区"
                type="text"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "请输入镇" }]}
              align="center"
              required
              label="镇"
              name="townName"
            >
              <Input
                value={address?.townName}
                onChange={(val) => setAddress({ ...address, townName: val })}
                className="address-input"
                placeholder="镇"
                type="text"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "请输入详情地址" }]}
              align="center"
              required
              label="详情地址"
              name="detail"
            >
              <TextArea
                autoSize
                maxLength={50}
                showCount
                className="textarea"
                value={address?.detail}
                placeholder="街道..."
                onChange={(value) => setAddress({ ...address, detail: value })}
              />
            </Form.Item>
          </Form>
        </Cell>
      </View>
    </ConfigProvider>
  );
}
