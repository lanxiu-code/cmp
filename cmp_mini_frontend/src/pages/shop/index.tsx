import "./index.scss";
import { ConfigProvider } from "@nutui/nutui-react-taro";
import CustomBar from "@/components/CustomBar/index";
import Category from "@/components/Category/index";
import customTheme from "./customTheme";

export default function Shop() {
  return (
    <ConfigProvider theme={customTheme}>
      <CustomBar />
      <Category />
    </ConfigProvider>
  );
}
