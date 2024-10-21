import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { NavBar } from "@nutui/nutui-react-taro";
import { title } from "@/constants";
import { getTitleBarHeight, getTopSafeArea } from "@/utils/systemInfo";
import { ArrowLeft } from "@nutui/icons-react-taro";
interface Props {
  customTitle?: string;
  color?: string;
  showBack?: boolean;
}
export default function CustomBar(props: Props) {
  const top = getTopSafeArea();
  const barHeight = getTitleBarHeight();
  return (
    <>
      <View style={{ height: top }}></View>
      <NavBar
        back={
          props?.showBack ? <ArrowLeft color={props?.color ?? "#000"} /> : ""
        }
        className="customBar"
        style={{ height: barHeight }}
        onBackClick={(e) => Taro.navigateBack()}
      >
        <Text
          className="title"
          style={{
            color: props?.color ?? "#000",
          }}
        >
          {props?.customTitle ? props.customTitle : title}
        </Text>
      </NavBar>
      {/* <Row
        // style={{ height: barHeight }}
        type="flex"
        align="center"
        justify={props?.showBack ? "space-between" : "center"}
      >
        {props?.showBack && (
          <Col span={5}>
            <ArrowLeft
              onClick={() => Taro.navigateBack()}
              color={props?.color ?? "#000"}
            />
          </Col>
        )}

        <Col
          span={props?.showBack ? 14 : 24}
          style={{ textAlign: props?.showBack ? "initial" : "center" }}
        >
          <Text
            className="title"
            style={{
              color: props?.color ?? "#000",
              lineHeight: barHeight,
            }}
          >
            {props?.customTitle ? props.customTitle : title}
          </Text>
        </Col>
      </Row> */}
    </>
  );
}
