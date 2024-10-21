import { View, Text, ScrollView } from "@tarojs/components";
import "./index.scss";
import {
  Button,
  Col,
  Row,
  Price,
  Image,
  Popup,
  Cell,
  InputNumber,
  Dialog,
} from "@nutui/nutui-react-taro";
import { Badge } from "@nutui/nutui-react-taro";
import { IconFont, Trash } from "@nutui/icons-react-taro";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearShopCart } from "@/store/shopCart";
import { calcCartPrice } from "@/utils/cartUtil";
import Taro from "@tarojs/taro";
export default function CartBar() {
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const shopCartList: [] = useSelector(
    (state: any) => state.shopCart.shopCartList
  );
  const dispatch = useDispatch();
  return (
    <Row className="cartBar" type="flex" align="center" justify="space-around">
      <Col span={4}>
        <Badge style={{ marginInlineEnd: "40px" }} value={shopCartList.length}>
          <IconFont
            onClick={() => setShowCartPopup(true)}
            size="40px"
            color="orange"
            fontClassName="iconfont"
            classPrefix="icon"
            name="gouwudai"
          />
        </Badge>
      </Col>
      <Col
        span={18}
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "flex-end",
        }}
      >
        <Price
          className="sum"
          price={calcCartPrice(shopCartList)}
          size="large"
          thousands
        />
        <Button
          onClick={() =>
            Taro.navigateTo({
              url: "/pages/shop/pay/index",
            })
          }
          className="btn"
          shape="round"
          type="primary"
        >
          去结算
        </Button>
      </Col>

      <Popup
        className="cartPopup"
        position="bottom"
        visible={showCartPopup}
        onClose={() => {
          setShowCartPopup(false);
        }}
      >
        <Row className="top" type="flex" justify="space-between" align="center">
          <Col span={8}>
            <Text className="selected">已选商品</Text>
          </Col>
          <Col span={4} style={{ display: "flex", alignContent: "center" }}>
            <Trash color="#989090" size={20} />
            <Text className="clear" onClick={() => setShowDialog(true)}>
              清空
            </Text>
          </Col>
        </Row>
        <ScrollView
          className="scrollview"
          scrollY
          scrollWithAnimation
          enhanced
          fastDeceleration
          trapScroll="true"
          enablePassive
          pagingEnabled
          showScrollbar={false}
          style={{ maxHeight: "500px" }}
        >
          {shopCartList.map((item: any) => {
            return (
              <Cell
                align="center"
                title={
                  <Row type="flex" align="center">
                    <Col span={10}>
                      <Image
                        radius={10}
                        width={60}
                        mode="aspectFill"
                        height={60}
                        src={item?.img}
                      />
                    </Col>
                    <Col span={10}>
                      <Text>{item?.name}</Text>
                      <Price price={item?.price} size="normal" thousands />
                    </Col>
                  </Row>
                }
                extra={<InputNumber defaultValue={item?.count} max={100} />}
              />
            );
          })}
        </ScrollView>
      </Popup>
      <Dialog
        visible={showDialog}
        cancelText="我再想想"
        onConfirm={() => {
          dispatch(clearShopCart());
          setShowDialog(false);
        }}
        onCancel={() => setShowDialog(false)}
      >
        确认清空购物车吗？
      </Dialog>
    </Row>
  );
}
