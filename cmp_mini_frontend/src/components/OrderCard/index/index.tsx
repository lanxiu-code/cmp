import { Avatar, Cell, Col, Price, Row, Space } from "@nutui/nutui-react-taro";
import "./index.scss";
import { Text, View } from "@tarojs/components";
import OrderType from "@/enum/order";
import Taro from "@tarojs/taro";
import dayjs from "dayjs";
import { OrdersVO } from "@/servers";
interface Props {
  data: OrdersVO;
}
export default function OrderCard(props: Props) {
  const itemRender = (data: OrdersVO) => {
    return (
      <View
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/order/detail/index?id=${data?.id}`,
          })
        }
      >
        <Cell.Group key={data?.id}>
          <Cell
            title={data?.orderNo}
            extra={OrderType[data?.status as number]}
          ></Cell>
          <Cell>
            <Avatar.Group size="large" max="3" level="right" maxContent="...">
              {data?.goodsList?.length &&
                data?.goodsList?.map((item) => (
                  <Avatar src={item?.image} key={item?.id} />
                ))}
            </Avatar.Group>
          </Cell>
          <Cell>
            <Row type="flex" align="center" justify="space-between">
              <Col span={10}>
                <Text>{`${dayjs(data?.createTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}`}</Text>
              </Col>
              <Col span={14} className="flex-end">
                <Space>
                  <Text>{`共${data?.quantity}件`}</Text>
                  <Price
                    style={{ color: "#000" }}
                    price={data?.totalPrice}
                    size="normal"
                    thousands
                  />
                </Space>
              </Col>
            </Row>
          </Cell>
        </Cell.Group>
      </View>
    );
  };
  return itemRender(props.data);
}
