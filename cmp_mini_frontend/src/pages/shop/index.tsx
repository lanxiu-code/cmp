import "./index.scss";
import { ConfigProvider } from "@nutui/nutui-react-taro";
import CustomBar from "@/components/CustomBar/index";
import Category from "@/components/Category/index";
import customTheme from "./customTheme";
import withAuth from "@/wrappers/auth";
import { useDispatch } from "react-redux";
import { getCategoryList } from "@/store/category";
import { useLoad } from "@tarojs/taro";
import { getGoodsList } from "@/store/goods";
import { CATEGORY_ID } from "@/constants";
import { getCartsList } from "@/store/shopCart";
import { getAddressList } from "@/store/address";

export default withAuth(() => {
  const dispatch = useDispatch();
  useLoad(async () => {
    await Promise.all([
      dispatch(getCategoryList() as any),
      dispatch(getGoodsList(CATEGORY_ID) as any),
      dispatch(getCartsList() as any),
      dispatch(getAddressList() as any),
    ]);
  });

  return (
    <ConfigProvider theme={customTheme}>
      <CustomBar />
      <Category />
    </ConfigProvider>
  );
});
