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
export default function Remark() {
  const [content, setContent] = useState<string>("");
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
            onChange={(val) => setContent(val)}
          />
          <Button size="xlarge" block type="primary">
            完成
          </Button>
        </Space>
      </View>
    </ConfigProvider>
  );
}
