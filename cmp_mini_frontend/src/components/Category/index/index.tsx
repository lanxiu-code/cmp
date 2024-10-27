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
import { getMenuSafeArea, getTitleBarHeight } from "@/utils/systemInfo";
import { Card } from "@nutui/nutui-react-taro";
import CartBar from "@/components/CartBar/index";
import { useDispatch, useSelector } from "react-redux";
import { CategoryVO, GoodsVO } from "@/servers";
import { getGoodsList } from "@/store/goods";
import { title } from "@/constants";
import { addCartsGoods } from "@/store/shopCart";
import Taro from "@tarojs/taro";
export default function Category() {
  const menuHeight = getMenuSafeArea();
  const titleBarHeight = getTitleBarHeight();
  const [currentGoods, setCurrentGoods] = useState<GoodsVO>();
  const [quantity, setQuantity] = useState<number>(1);
  const [tabIndex, setTabIndex] = useState<string | number>("0");
  const dispath = useDispatch();
  const [showCardPopup, setShowCardPopup] = useState(false);
  const categoryList: CategoryVO[] = useSelector(
    (state: any) => state.category.categoryList
  );
  const goodsMap: Map<string, GoodsVO[]> = useSelector(
    (state: any) => state.goods.goodsMap
  );
  // 添加到购物车
  const addCarts = async (goods: GoodsVO, isNow: boolean = false) => {
    const newGoods = { ...goods, quantity };
    await dispath(addCartsGoods(newGoods) as any);
    setShowCardPopup(false);
    if (isNow) {
      Taro.navigateTo({
        url: "/pages/shop/pay/index",
      });
    }
  };
  return (
    <View className="category">
      <Tabs
        autoHeight={true}
        activeColor="#accbee"
        value={tabIndex}
        style={{ height: `calc(100vh - ${menuHeight} - ${titleBarHeight})` }}
        onChange={(value) => {
          setTabIndex(value);
          const categoryId = categoryList[value].id;
          if (goodsMap[categoryId]) return;
          dispath(getGoodsList(categoryId) as any);
        }}
        activeType="smile"
        direction="vertical"
      >
        {categoryList.length &&
          categoryList.map((category: CategoryVO) => (
            <Tabs.TabPane key={category?.id} title={category.name}>
              {goodsMap[category?.id as number]?.length &&
                goodsMap[category?.id as number].map((goods: GoodsVO) => {
                  return (
                    <Card
                      onClick={() => {
                        setQuantity(1);
                        setCurrentGoods(goods);
                        setShowCardPopup(true);
                      }}
                      style={{ marginBottom: "15px" }}
                      src={goods.image}
                      title={goods.name}
                      price={goods.price?.toString()}
                      shopDescription={"自营店"}
                      shopName={title}
                    />
                  );
                })}
            </Tabs.TabPane>
          ))}
      </Tabs>
      <CartBar />
      <Popup
        position="bottom"
        visible={showCardPopup}
        style={{ padding: "10px 10px", boxSizing: "border-box" }}
        onClose={() => {
          setShowCardPopup(false);
        }}
      >
        <Row type="flex" justify="center" align="center">
          <Image
            radius={10}
            mode="aspectFill"
            src={currentGoods?.image}
            height={200}
          />
        </Row>
        <Row type="flex" justify="space-between" align="center">
          <Col span={10}>
            <Text className="name">{currentGoods?.name}</Text>
          </Col>
          <Col span={10} className="flex-end">
            <Text className="count">还剩{currentGoods?.stock}份</Text>
          </Col>
        </Row>
        <Row type="flex" justify="space-between" align="center">
          <Col span={7}>
            <Text className="price">￥{currentGoods?.price}</Text>
          </Col>
          <Col span={10}>
            <InputNumber
              value={quantity}
              onChange={(value: number) => setQuantity(value)}
              min={1}
              max={currentGoods?.stock}
            />
          </Col>
        </Row>
        <Row type="flex" justify="space-between" align="center">
          <Col span={11} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => addCarts(currentGoods as GoodsVO, true)}
              size="large"
              type="default"
              style={{ width: "100%" }}
            >
              立即购买
            </Button>
          </Col>
          <Col span={11} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => addCarts(currentGoods as GoodsVO)}
              size="large"
              type="primary"
              style={{ width: "100%" }}
            >
              加入购物车
            </Button>
          </Col>
        </Row>
      </Popup>
    </View>
  );
}
