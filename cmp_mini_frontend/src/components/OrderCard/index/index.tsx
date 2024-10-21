import { Cell, Col, Image, Price, Row, Space } from "@nutui/nutui-react-taro";
import "./index.scss";
import { CustomWrapper, Text, View } from "@tarojs/components";
import OrderType from "@/enum/order";
import Taro from "@tarojs/taro";
interface Props {
  data: any;
}
export default function OrderCard(props: Props) {
  const itemRender = (data) => {
    return (
      <View
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/order/detail/index?id=${data?.id}`,
          })
        }
      >
        <Cell.Group key={data?.id}>
          <Cell title={data?.name} extra={OrderType[data.type]}></Cell>
          <Cell>
            <Image radius={15} src={data?.img} height={80} width={80} />
          </Cell>
          <Cell>
            <Row type="flex" align="center" justify="space-between">
              <Col span={10}>
                <Text>{data?.createTime}</Text>
              </Col>
              <Col span={14} className="flex-end">
                <Space>
                  <Text>{`共${data?.count}件`}</Text>
                  <Price
                    style={{ color: "#000" }}
                    price={data?.total}
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
