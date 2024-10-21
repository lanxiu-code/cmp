import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

import {
  Button,
  CalendarCard,
  type CalendarCardValue,
} from "@nutui/nutui-react-taro";
export default function Register() {
  const onChange = (val: CalendarCardValue) => {
    console.log(val);
  };
  return <CalendarCard defaultValue={new Date()} onChange={onChange} />;
}
