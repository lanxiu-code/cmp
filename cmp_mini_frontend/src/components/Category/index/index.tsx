import { View, Text } from "@tarojs/components";
import "./index.scss";
import {
  Button,
  Col,
  Image,
  InputNumber,
  Popup,
  Row,
  Tabs,
} from "@nutui/nutui-react-taro";
import { useState } from "react";
import {
  getMenuSafeArea,
  getTitleBarHeight,
  getTopSafeArea,
} from "@/utils/systemInfo";
import { Card } from "@nutui/nutui-react-taro";
import CartBar from "@/components/CartBar/index";
import { useSelector } from "react-redux";
export default function Category() {
  const menuHeight = getMenuSafeArea();
  const titleBarHeight = getTitleBarHeight();

  const [showCardPopup, setShowCardPopup] = useState(false);
  const shopCartList: [] = useSelector(
    (state: any) => state.shopCart.shopCartList
  );
  const [tab6value, setTab6value] = useState<string | number>("0");
  const tabList = ["生活用品", "面饼", "蛋类", "饮料"];
  const state = {
    src: "//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
    title:
      "【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水",
    price: "388",
    vipPrice: "378",
    shopDescription: "自营",
    shopName: "阳澄湖大闸蟹自营店>",
  };

  return (
    <View className="category">
      <Tabs
        autoHeight={true}
        activeColor="#accbee"
        value={tab6value}
        style={{ height: `calc(100vh - ${menuHeight} - ${titleBarHeight})` }}
        onChange={(value) => {
          setTab6value(value);
        }}
        activeType="smile"
        direction="vertical"
      >
        {tabList.map((item) => (
          <Tabs.TabPane key={item} title={item}>
            {[1, 2, 3, 4, 6, 7, 8].map((item) => {
              return (
                <Card
                  onClick={() => setShowCardPopup(true)}
                  style={{ marginBottom: "15px" }}
                  src={state.src}
                  title={state.title}
                  price={state.price}
                  vipPrice={state.vipPrice}
                  shopDescription={state.shopDescription}
                  shopName={state.shopName}
                />
              );
            })}
          </Tabs.TabPane>
        ))}
      </Tabs>
      {shopCartList.length ? <CartBar /> : <></>}
      <Popup
        position="bottom"
        visible={showCardPopup}
        style={{ padding: "10px 10px", boxSizing: "border-box" }}
        onClose={() => {
          setShowCardPopup(false);
        }}
      >
        <Row type="flex" justify="center" align="center">
          <Image radius={10} mode="aspectFill" src={state.src} height={200} />
        </Row>
        <Row type="flex" justify="space-between" align="center">
          <Col span={6}>
            <Text className="name">面饼</Text>
          </Col>
          <Col span={4}>
            <Text className="count">还剩10份</Text>
          </Col>
        </Row>
        <Row type="flex" justify="space-between" align="center">
          <Col span={7}>
            <Text className="price">￥10.00</Text>
          </Col>
          <Col span={10}>
            <InputNumber defaultValue={1} min={0} />
          </Col>
        </Row>
        <Row type="flex" justify="space-between" align="center">
          <Col span={11} style={{ display: "flex", justifyContent: "center" }}>
            <Button size="large" type="default" style={{ width: "100%" }}>
              立即购买
            </Button>
          </Col>
          <Col span={11} style={{ display: "flex", justifyContent: "center" }}>
            <Button size="large" type="primary" style={{ width: "100%" }}>
              加入购物车
            </Button>
          </Col>
        </Row>
      </Popup>
    </View>
  );
}
