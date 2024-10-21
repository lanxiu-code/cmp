import {
  Cell,
  Col,
  Ellipsis,
  Image,
  Price,
  Row,
  Space,
} from "@nutui/nutui-react-taro";
import "./index.scss";
import { Text } from "@tarojs/components";
interface Props {
  data: any;
}
export default function SettleCard(props: Props) {
  return (
    <Cell
      key={props?.data?.id}
      align="center"
      title={
        <Row type="flex" align="center" justify="space-between">
          <Col span={10}>
            <Image
              radius={10}
              width={60}
              mode="aspectFill"
              height={60}
              src={props?.data?.img}
            />
          </Col>
          <Col span={12}>
            <Ellipsis
              content={props?.data?.name}
              direction="end"
              expandText="展开"
              collapseText="收起"
              rows={1}
            />
            <Text>{`x ${props?.data?.count}`}</Text>
          </Col>
        </Row>
      }
      extra={
        <Price
          price={props?.data?.price * props?.data?.count}
          size="normal"
          thousands
        />
      }
    />
  );
}
