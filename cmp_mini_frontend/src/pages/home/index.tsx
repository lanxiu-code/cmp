import CustomBar from "@/components/CustomBar/index";
import "./index.scss";
import { ConfigProvider } from "@nutui/nutui-react-taro";
export default function Home() {
  return (
    <ConfigProvider>
      <CustomBar />
    </ConfigProvider>
  );
}
