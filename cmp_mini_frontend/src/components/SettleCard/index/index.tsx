import {
  Cell,
  Col,
  Ellipsis,
  Image,
  Price,
  Row,
} from "@nutui/nutui-react-taro";
import "./index.scss";
import { Text } from "@tarojs/components";
import { CartsVO } from "@/servers";
interface Props {
  data: CartsVO;
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
              src={props?.data.goods?.image}
            />
          </Col>
          <Col span={12}>
            <Ellipsis
              content={props?.data.goods?.name}
              direction="end"
              expandText="展开"
              collapseText="收起"
              rows={1}
            />
            <Text>{`x ${props?.data.goods?.quantity}`}</Text>
          </Col>
        </Row>
      }
      extra={
        <Price
          price={
            (props?.data?.goods?.price as number) *
            (props?.data.goods?.quantity as number)
          }
          size="normal"
          thousands
        />
      }
    />
  );
}
