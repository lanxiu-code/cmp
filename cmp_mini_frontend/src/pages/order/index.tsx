import "./index.scss";
import {
  ConfigProvider,
  InfiniteLoading,
  Loading,
  Tabs,
} from "@nutui/nutui-react-taro";
import CustomBar from "@/components/CustomBar/index";
import { useState } from "react";
import customTheme from "./customTheme";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "@tarojs/components";
import OrderCard from "@/components/OrderCard/index/index";
import { useLoad } from "@tarojs/taro";
import { getOrdersList } from "@/store/order";
import { OrdersVO } from "@/servers";
import withAuth from "@/wrappers/auth";
import { OrderStatus } from "@/enum/order";
export default withAuth(() => {
  const orderList: OrdersVO[] = useSelector(
    (state: any) => state.order.orderList
  );
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
  });
  const [currentStatus, setCurrentStatus] = useState<string>(OrderStatus.ALL);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  useLoad(async () => {
    await Promise.all([dispatch(getOrdersList() as any)]);
  });
  // 下拉刷新数据
  const loadData = async (status = currentStatus) => {
    const res = await dispatch(
      getOrdersList(1, pageInfo.pageSize, status) as any
    );
    setPageInfo({ ...pageInfo, current: 1 });
    if (pageInfo.current * pageInfo.pageSize >= res.data.total) {
      setHasMore(false);
    }
  };
  // 触底加载更多
  const loadMore = async () => {
    const res = await dispatch(
      getOrdersList(
        pageInfo.current + 1,
        pageInfo.pageSize,
        currentStatus
      ) as any
    );
    setPageInfo({ ...pageInfo, current: pageInfo.current + 1 });
    if (pageInfo.current * pageInfo.pageSize >= res.data.total) {
      setHasMore(false);
    }
  };

  return (
    <ConfigProvider className="orderPage" theme={customTheme}>
      <CustomBar />
      <Tabs
        value={currentStatus}
        activeType="smile"
        onChange={(value: string) => {
          setCurrentStatus(value);
          loadData(value);
        }}
      >
        <Tabs.TabPane title="全部" value={OrderStatus.ALL}>
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
            {orderList.length ? (
              orderList.map((item: OrdersVO, index) => {
                return <OrderCard data={item} />;
              })
            ) : (
              <></>
            )}
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
        <Tabs.TabPane title="待完成" value={OrderStatus.WAIT}>
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
            {orderList.length ? (
              orderList.map((item: OrdersVO, index) => {
                return <OrderCard data={item} />;
              })
            ) : (
              <></>
            )}
          </InfiniteLoading>
        </Tabs.TabPane>
        <Tabs.TabPane title="已完成" value={OrderStatus.SUCCESS}>
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
            {orderList.length ? (
              orderList.map((item: OrdersVO, index) => {
                return <OrderCard data={item} />;
              })
            ) : (
              <></>
            )}
          </InfiniteLoading>
        </Tabs.TabPane>
        <Tabs.TabPane title="退单" value={OrderStatus.CANCEL}>
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
            {orderList.length ? (
              orderList.map((item: OrdersVO, index) => {
                return <OrderCard data={item} />;
              })
            ) : (
              <></>
            )}
          </InfiniteLoading>
        </Tabs.TabPane>
      </Tabs>
    </ConfigProvider>
  );
});
