import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { ConfigProvider } from "@nutui/nutui-react-taro";
export default function Index() {
  return <ConfigProvider></ConfigProvider>;
}
