import "./index.scss";
import {
  Cell,
  Col,
  ConfigProvider,
  Image,
  InfiniteLoading,
  Loading,
  Price,
  Row,
  Space,
  Tabs,
} from "@nutui/nutui-react-taro";
import CustomBar from "@/components/CustomBar/index";
import { useEffect, useState } from "react";
import customTheme from "./customTheme";
import { useSelector } from "react-redux";
import { ScrollView, Text } from "@tarojs/components";
import OrderCard from "@/components/OrderCard/index/index";
export default function Order() {
  const [tabValue, setTabValue] = useState<string | number>("0");
  const orderList: [] = useSelector((state: any) => state.order.orderList);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const touchBottom = () => {
    if (pageNo > 25) return;
    setPageNo(pageNo + 1);
  };
  const loadData = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 3000);
    });
    console.log("刷新数据");
  };
  const loadMore = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 3000);
    });
    setHasMore(false);
  };

  return (
    <ConfigProvider className="orderPage" theme={customTheme}>
      <CustomBar />
      <Tabs
        value={tabValue}
        activeType="smile"
        onChange={(value) => {
          setTabValue(value);
        }}
      >
        <Tabs.TabPane title="全部">
          <InfiniteLoading
            target="scroll"
            hasMore={hasMore}
            onLoadMore={loadMore}
            pullRefresh
            onRefresh={loadData}
            loadingText={<Loading type="circular" />}
            pullingText={<Loading type="circular" />}
            loadMoreText={<>没有更多了</>}
          >
            {orderList.map((item: any, index) => {
              return <OrderCard data={item} />;
            })}
          </InfiniteLoading>
          {/* <ScrollView
            className="scrollview"
            scrollY
            scrollWithAnimation
            enhanced
            fastDeceleration
            trapScroll="true"
            enablePassive
            onScrollToLower={touchBottom}
            lowerThreshold={20}
            pagingEnabled
            showScrollbar={false}
            style={{ maxHeight: "79vh" }}
          >
            {orderList.map((item: any) => {
              return <OrderCard data={item} />;
            })}
          </ScrollView> */}
        </Tabs.TabPane>
        <Tabs.TabPane title="历史">
          <ScrollView
            className="scrollview"
            scrollY
            scrollWithAnimation
            onScrollToLower={touchBottom}
            enhanced
            fastDeceleration
            trapScroll="true"
            enablePassive
            pagingEnabled
            showScrollbar={false}
            style={{ maxHeight: "79vh" }}
          >
            {orderList
              .filter((item: any) => item?.type == 0)
              .map((item: any) => {
                return <OrderCard data={item} />;
              })}
          </ScrollView>
        </Tabs.TabPane>
        <Tabs.TabPane title="退单">
          <ScrollView
            className="scrollview"
            scrollY
            scrollWithAnimation
            enhanced
            fastDeceleration
            trapScroll="true"
            enablePassive
            pagingEnabled
            onScrollToLower={touchBottom}
            showScrollbar={false}
            style={{ maxHeight: "79vh" }}
          >
            {orderList
              .filter((item: any) => item?.type == 1)
              .map((item: any) => {
                return <OrderCard data={item} />;
              })}
          </ScrollView>
        </Tabs.TabPane>
      </Tabs>
    </ConfigProvider>
  );
}
