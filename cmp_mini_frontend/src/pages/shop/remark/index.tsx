import CustomBar from "@/components/CustomBar/index";
import "./index.scss";
import {
  Button,
  ConfigProvider,
  Space,
  TextArea,
} from "@nutui/nutui-react-taro";
import { useState } from "react";
import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import PubSub from "pubsub-js";
interface Params {
  remark?: string;
}
export default function Remark() {
  const [content, setContent] = useState("");
  useLoad((params: Params) => {
    if (params.remark != undefined && params.remark != "undefined") {
      setContent(params?.remark as string);
    }
  });
  return (
    <ConfigProvider className="remark">
      <CustomBar customTitle="订单备注" showBack={true} />
      <View className="content">
        <Space direction="vertical">
          <TextArea
            className="textarea"
            value={content}
            placeholder="填写备注...."
            style={{ fontSize: "15px" }}
            maxLength={50}
            showCount={true}
            autoSize
            onChange={(val) => {
              setContent(val);
            }}
          />
          <Button
            onClick={() => {
              PubSub.publish("setOrdersRemark", content);
              Taro.navigateBack();
            }}
            size="xlarge"
            block
            type="primary"
          >
            完成
          </Button>
        </Space>
      </View>
    </ConfigProvider>
  );
}
