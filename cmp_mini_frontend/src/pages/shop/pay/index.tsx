import "./index.scss";
import {
  Address,
  Cell,
  Collapse,
  ConfigProvider,
} from "@nutui/nutui-react-taro";
import CustomBar from "@/components/CustomBar/index";
import { Text, View } from "@tarojs/components";
import { ArrowDown, ArrowRight } from "@nutui/icons-react-taro";
import { useDispatch, useSelector } from "react-redux";
import customTheme from "./customTheme";
import SettleBar from "@/components/SettleBar/index";
import Taro, { Events, useLoad } from "@tarojs/taro";
import SettleCard from "@/components/SettleCard/index";
import { useState } from "react";
import { getAddress } from "@/utils/addressUtils";
import { CartsVO, OrdersAddRequest } from "@/servers";
import { buildAddressObjList } from "@/adapter/AddressAdapter";
import { calcCartCount, calcCartPrice } from "@/utils/cartUtil";
import { buildOrderGoodsAddList } from "@/adapter/OrdersAdapter";
interface AddressList {
  id?: string | number;
  provinceName: string;
  cityName: string;
  countyName: string;
  townName: string;
  addressDetail: string;
  selectedAddress: boolean;
  name?: string;
  phone?: string;
}
export default function Pay() {
  const [addressVisible, setAddressVisible] = useState(false);
  const events = new Events();
  const shopCartList: [] = useSelector(
    (state: any) => state.shopCart.shopCartList
  );
  const addressList: [] = useSelector(
    (state: any) => state.address.addressList
  );
  const [existList, setExistAddress] = useState();
  const [ordersInfo, setOrdersInfo] = useState<OrdersAddRequest>({});
  const [address, setAddress] = useState("请选择地址");

  const selectedTwo = (data: AddressList) => {
    setOrdersInfo({
      ...ordersInfo,
      addressId: data.id as number,
    });
    setAddress(getAddress(data));
  };
  // 监听订单备注
  events.on("setOrdersRemark", (remark: string) => {
    console.log(remark);
    setOrdersInfo({ remark });
  });
  useLoad(() => {
    if (shopCartList.length <= 0) {
      Taro.navigateBack();
    }
    setExistAddress(buildAddressObjList(addressList) as any);
    // 填充订单信息
    setOrdersInfo({
      orderGoodsAddList: buildOrderGoodsAddList(shopCartList),
      quantity: calcCartCount(shopCartList),
      totalPrice: calcCartPrice(shopCartList),
    });
  });

  return (
    <ConfigProvider className="payPage" theme={customTheme}>
      <CustomBar customTitle="订单结算" color="#fff" showBack={true} />
      <View className="background"></View>
      <Cell
        clickable
        onClick={() => setAddressVisible(true)}
        className="card"
        title={<Text className="address">{address}</Text>}
        align="center"
        extra={<ArrowRight />}
      />
      <View className="content">
        <Collapse
          defaultActiveName={shopCartList.length <= 4 ? ["1"] : []}
          className="cardGroup"
          expandIcon={<ArrowDown />}
        >
          <Collapse.Item title="已选商品" name="1">
            {shopCartList.map((item: CartsVO) => {
              return <SettleCard data={item} />;
            })}
          </Collapse.Item>
        </Collapse>
        <Cell
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/shop/remark/index",
            });
          }}
          title="备注"
          description="特殊需求请说明"
          extra={<ArrowRight />}
        />
      </View>
      <SettleBar data={ordersInfo} />
      <Address
        visible={addressVisible}
        type="exist"
        existList={existList}
        onExistSelect={selectedTwo}
        title="配送"
        onClose={() => setAddressVisible(false)}
      />
    </ConfigProvider>
  );
}
