import { View, Text, ScrollView } from "@tarojs/components";
import Taro, { useLoad, useRouter } from "@tarojs/taro";
import "./index.scss";
import {
  Cell,
  Collapse,
  ConfigProvider,
  Ellipsis,
  Row,
} from "@nutui/nutui-react-taro";
import CustomBar from "@/components/CustomBar/index";
import { ArrowDown, ArrowRight } from "@nutui/icons-react-taro";
import { useSelector } from "react-redux";
import SettleCard from "@/components/SettleCard/index";
import customTheme from "./customTheme";

export default function Detail() {
  const { params } = useRouter();
  console.log(params);
  const shopCartList: [] = useSelector(
    (state: any) => state.shopCart.shopCartList
  );

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
          <View className="top">
            <Row>
              <Text className="title">{`订单已完成`}</Text>
            </Row>
          </View>
          <View className="middle">
            <Cell.Group>
              <Cell
                title="清白江xxx食品店"
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
              defaultActiveName={shopCartList.length <= 4 ? ["1"] : []}
              className="cardGroup"
              expandIcon={<ArrowDown />}
            >
              <Collapse.Item title="购买商品" name="1">
                {shopCartList.map((item: any) => {
                  return <SettleCard data={item} />;
                })}
              </Collapse.Item>
            </Collapse>
            <Cell.Group divider={false} style={{ borderRadius: "100px" }}>
              <Cell title="下单时间" extra="2020-1-1 20:00" />
              <Cell title="订单编号" extra="234752937452347593" />
              <Cell title="备注" extra="无" />
              <Cell title="门店" extra="清白江xxx副食店" />
            </Cell.Group>
          </View>
        </ScrollView>
      </View>
    </ConfigProvider>
  );
}
