import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import {
  Button,
  Cell,
  ConfigProvider,
  FixedNav,
  Row,
  Space,
  Swipe,
} from "@nutui/nutui-react-taro";
import CustomBar from "@/components/CustomBar/index";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "@/utils/addressUtils";
import { deleteAddress, getAddressList } from "@/store/address";
import { AddressVO } from "@/servers";
export default function Address() {
  const addressList = useSelector((state: any) => state.address.addressList);
  const dispatch = useDispatch();
  const swipeRef = useRef(null);
  const [navVisible, setNavVisible] = useState(false);
  const navList = [
    {
      id: 1,
      text: "新增",
      icon: "https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png",
    },
  ];
  const selectedNav = (
    item: any,
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    switch (item.id) {
      case 1:
        Taro.navigateTo({
          url: "/pages/add/address/index",
        });
        break;
    }
  };
  useLoad(async () => {
    await dispatch(getAddressList() as any);
  });
  return (
    <ConfigProvider className="addressPage">
      <CustomBar showBack customTitle="收货地址" />
      <Cell.Group>
        {addressList.map((item: AddressVO) => {
          return (
            <Swipe
              key={item.id}
              ref={swipeRef}
              onActionClick={() => {
                //@ts-ignore
                swipeRef?.current?.close();
              }}
              rightAction={
                <Button
                  onClick={async () =>
                    await dispatch(deleteAddress(item.id as number) as any)
                  }
                  type="primary"
                  shape="square"
                >
                  删除
                </Button>
              }
            >
              <Cell className="col">
                <Row>{getAddress(item)}</Row>
                <Row>
                  <Space>
                    <Text>{item.name}</Text>
                    <Text>{item.phone}</Text>
                  </Space>
                </Row>
              </Cell>
            </Swipe>
          );
        })}
      </Cell.Group>
      <FixedNav
        list={navList}
        activeText="操作"
        inactiveText="管理"
        overlay={false}
        position={{ bottom: "10vh" }}
        onChange={(value: boolean) => setNavVisible(value)}
        visible={navVisible}
        onSelect={selectedNav}
      />
    </ConfigProvider>
  );
}
