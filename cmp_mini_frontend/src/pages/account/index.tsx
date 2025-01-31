import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import {
  Avatar,
  Cell,
  Col,
  ConfigProvider,
  Button,
  Row,
} from "@nutui/nutui-react-taro";
import CustomBar from "@/components/CustomBar/index";
import customTheme from "./customTheme";
import { ArrowRight } from "@nutui/icons-react-taro";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserVO } from "@/servers";
import { userLogout } from "@/store/user";
export default function Account() {
  const userInfo: LoginUserVO = useSelector(
    (state: any) => state.user.userInfo
  );
  const dispatch = useDispatch();
  return (
    <ConfigProvider className="accountPage" theme={customTheme}>
      <CustomBar />
      <View className="top">
        <Row type="flex" className="avatar" justify="center" align="center">
          <Col span={8} className="align-center col">
            <Avatar size="large" src={userInfo?.userAvatar} />
            <View>{userInfo?.name}</View>
          </Col>
        </Row>
      </View>
      <View className="middle">
        <Cell.Group>
          <Cell
            clickable
            onClick={() =>
              Taro.navigateTo({
                url: "/pages/account/address/index",
              })
            }
            title="地址管理"
            extra={<ArrowRight />}
          />
          <Cell
            title="个人信息"
            clickable
            extra={
              <ArrowRight
                onClick={() =>
                  Taro.navigateTo({
                    url: "/pages/account/info/index",
                  })
                }
              />
            }
          />
        </Cell.Group>
        <View style={{ margin: "15px" }}>
          <Button
            onClick={async () => {
              await dispatch(userLogout() as any);
            }}
            block
            style={{ height: "40px" }}
            type="primary"
          >
            退出登录
          </Button>
        </View>
      </View>
    </ConfigProvider>
  );
}
