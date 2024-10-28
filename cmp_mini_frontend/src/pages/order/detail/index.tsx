import { View, Text, ScrollView } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { Cell, Collapse, ConfigProvider, Row } from "@nutui/nutui-react-taro";
import CustomBar from "@/components/CustomBar/index";
import { ArrowDown, ArrowRight } from "@nutui/icons-react-taro";
import SettleCard from "@/components/SettleCard/index";
import customTheme from "./customTheme";
import { TITLE } from "@/constants";
import {
  AddressVO,
  GoodsVO,
  OrdersControllerService,
  OrdersVO,
} from "@/servers";
import { useState } from "react";
import OrderType from "@/enum/order";
import dayjs from "dayjs";
import { getAddress } from "@/utils/addressUtils";
import { buildCartsVO } from "@/adapter/CartsAdapter";
interface Params {
  id: string;
}

export default function Detail() {
  const [ordersDetail, setOrdersDetail] = useState<OrdersVO>({});
  // 获取订单详情
  const getOrdersDetail = async (id: any) => {
    const res = await OrdersControllerService.getOrdersVoByIdUsingGet(id);
    setOrdersDetail(res.data as OrdersVO);
  };
  useLoad(async (params: Params) => {
    if (!params?.id) {
      Taro.navigateBack();
    }
    await getOrdersDetail(params.id);
  });
  return (
    <ConfigProvider className="detail" theme={customTheme}>
      <CustomBar customTitle="订单详情" showBack />
      <View className="content">
        <ScrollView
          className="scrollview"
          scrollY
          scrollWithAnimation
          enhanced
          fastDeceleration
          trapScroll="true"
          enablePassive
          lowerThreshold={20}
          pagingEnabled
          showScrollbar={false}
          style={{ maxHeight: "88vh" }}
        >
          {ordersDetail?.id && (
            <>
              <View className="top">
                <Row>
                  <Text className="title">{`订单${
                    OrderType[ordersDetail?.status as any]
                  }`}</Text>
                </Row>
              </View>
              <View className="middle">
                <Cell.Group>
                  <Cell
                    title={TITLE}
                    extra={
                      <ArrowRight
                        onClick={() =>
                          Taro.switchTab({
                            url: "/pages/shop/index",
                          })
                        }
                      />
                    }
                    description="四川省德阳市旌阳区横江路xx号"
                  />
                </Cell.Group>
                <Collapse
                  defaultActiveName={
                    (ordersDetail?.goodsList?.length as any) <= 4 ? ["1"] : []
                  }
                  className="cardGroup"
                  expandIcon={<ArrowDown />}
                >
                  <Collapse.Item title="购买商品" name="1">
                    {ordersDetail?.goodsList?.length &&
                      ordersDetail?.goodsList?.map((item: GoodsVO) => {
                        return (
                          <SettleCard
                            data={buildCartsVO(item.id as number, item)}
                          />
                        );
                      })}
                  </Collapse.Item>
                </Collapse>
                <Cell.Group divider={false} style={{ borderRadius: "100px" }}>
                  <Cell
                    title="下单时间"
                    extra={`${dayjs(ordersDetail?.createTime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}`}
                  />
                  <Cell title="订单编号" extra={ordersDetail?.orderNo} />
                  <Cell
                    title="收货信息"
                    extra={getAddress(ordersDetail?.address as AddressVO)}
                  />
                  <Cell title="备注" extra={ordersDetail?.remark} />
                  <Cell title="门店" extra={TITLE} />
                </Cell.Group>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </ConfigProvider>
  );
}
