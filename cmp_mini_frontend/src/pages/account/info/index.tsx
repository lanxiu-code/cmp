import CustomBar from "@/components/CustomBar/index";
import "./index.scss";
import {
  Avatar,
  Button,
  Cell,
  ConfigProvider,
  Input,
  Popup,
  Space,
} from "@nutui/nutui-react-taro";
import { Text, View } from "@tarojs/components";
import { ArrowRight } from "@nutui/icons-react-taro";
import { LoginUserVO } from "@/servers";
import { useDispatch, useSelector } from "react-redux";
import customTheme from "./customTheme";
import { useState } from "react";
import { setUserInfo, updateMyUser } from "@/store/user";
import { useLoad } from "@tarojs/taro";
export default function AccountInfo() {
  const [popupShow, setPopupShow] = useState(false);
  const [field, setField] = useState("");
  const [content, setContent] = useState("");
  const [updateUser, setUpdateUser] = useState({});

  const dispatch = useDispatch();
  const userInfo: LoginUserVO = useSelector(
    (state: any) => state.user.userInfo
  );
  useLoad(() => {
    setUpdateUser({ ...userInfo });
  });
  return (
    <ConfigProvider className="accountInfoPage col" theme={customTheme}>
      <CustomBar customTitle="个人信息" showBack />
      <View className="content">
        <Cell.Group>
          <Cell
            title="头像"
            extra={
              <>
                <Avatar src={userInfo?.userAvatar} />
                <ArrowRight
                  onClick={() => {
                    setField("userAvatar");
                    setContent(userInfo?.userAvatar as string);
                    setPopupShow(true);
                  }}
                />
              </>
            }
            clickable
          />
          <Cell
            title="姓名"
            extra={
              <>
                <Text>{userInfo?.name}</Text>
                <ArrowRight
                  onClick={() => {
                    setField("name");
                    setContent(userInfo?.name as string);
                    setPopupShow(true);
                  }}
                />
              </>
            }
            clickable
          />
          <Cell
            title="电话"
            extra={
              <>
                <Text>{userInfo?.phone}</Text>
                <ArrowRight
                  onClick={() => {
                    setField("phone");
                    setContent(userInfo?.phone as string);
                    setPopupShow(true);
                  }}
                />
              </>
            }
            clickable
          />
        </Cell.Group>
      </View>
      <Popup
        visible={popupShow}
        round
        style={{ padding: "10px", width: "80%" }}
        onClose={() => setPopupShow(false)}
      >
        <Space direction="vertical" justify="center">
          <Input
            className="edit-input"
            placeholder="请输入信息"
            value={content}
            type="text"
            onChange={(v) => {
              setContent(v);
              setUpdateUser({ ...updateUser, [field]: v });
            }}
          />
          <Button
            onClick={async () => {
              await dispatch(updateMyUser(updateUser) as any);
              setPopupShow(false);
            }}
            style={{ height: "40px" }}
            block
            type="primary"
          >
            确定
          </Button>
        </Space>
      </Popup>
    </ConfigProvider>
  );
}
