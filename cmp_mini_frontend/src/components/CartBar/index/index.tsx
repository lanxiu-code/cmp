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
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartsList, deleteCarts, updateCartsList } from "@/store/shopCart";
import { calcCartPrice } from "@/utils/cartUtil";
import Taro from "@tarojs/taro";
import { CartsVO } from "@/servers";
export default function CartBar() {
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const shopCartList: CartsVO[] = useSelector(
    (state: any) => state.shopCart.shopCartList
  );
  const changeQuantity = useCallback(async (carts: CartsVO, value: number) => {
    if (value == 0) {
      await dispatch(deleteCarts(carts.id as number) as any);
    } else {
      await dispatch(
        updateCartsList({
          id: carts.id,
          quantity: value,
          goodsId: carts.goods?.id,
        }) as any
      );
    }
  }, []);
  return (
    <>
      {shopCartList.length ? (
        <Row
          className="cartBar"
          type="flex"
          align="center"
          justify="space-around"
        >
          <Col span={4}>
            <Badge
              style={{ marginInlineEnd: "40px" }}
              value={shopCartList.length}
            >
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
            <Row
              className="top"
              type="flex"
              justify="space-between"
              align="center"
            >
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
              {shopCartList.map((cart) => {
                return (
                  <Cell
                    key={cart.id}
                    align="center"
                    title={
                      <Row type="flex" align="center">
                        <Col span={10}>
                          <Image
                            radius={10}
                            width={60}
                            mode="aspectFill"
                            height={60}
                            src={cart.goods?.image}
                          />
                        </Col>
                        <Col span={14} className="col">
                          <Text>{cart.goods?.name}</Text>
                          <Price
                            price={
                              (cart.goods?.price as number) *
                              (cart.goods?.quantity as number)
                            }
                            size="normal"
                            thousands
                          />
                        </Col>
                      </Row>
                    }
                    extra={
                      <InputNumber
                        value={cart.goods?.quantity}
                        onChange={(value: number) =>
                          changeQuantity(cart, value)
                        }
                        min={0}
                        max={cart.goods?.stock}
                      />
                    }
                  />
                );
              })}
            </ScrollView>
          </Popup>
          <Dialog
            visible={showDialog}
            cancelText="我再想想"
            onConfirm={async () => {
              await dispatch(clearCartsList() as any);
              setShowDialog(false);
            }}
            onCancel={() => setShowDialog(false)}
          >
            确认清空购物车吗？
          </Dialog>
        </Row>
      ) : (
        ""
      )}
    </>
  );
}
