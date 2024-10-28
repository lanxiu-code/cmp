import { PropsWithChildren, Component } from "react";
import "./app.scss";
import "@nutui/nutui-react-taro/dist/style.css";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import "./mock";
import "./assets/iconfont/iconfont.css";
import withAuth from "./wrappers/auth";
import Taro, { useDidShow, useLaunch, useLoad } from "@tarojs/taro";
import { UserControllerService } from "./servers";
import { ResponseCode } from "./servers/core/request";
// function App({ children }) {
//   useLaunch(() => {
//     console.log("App launched.");
//   });
//   // children 是将要会渲染的页面
//   return <Provider store={store}>children</Provider>;
// }

// class App extends Component {
//   componentDidMount(): void {
//     console.log("App mounted.");
//   }
//   render() {
//     //@ts-ignore
//     return <Provider store={store}>{this.props.children}</Provider>;
//   }
// }
const App = (props) => {
  useLaunch(async () => {
    console.log("App launched.");
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code == ResponseCode.SUCCESS) {
      Taro.switchTab({
        url: "/pages/shop/index",
      });
      // Taro.navigateTo({
      //   url: "/pages/account/info/index",
      // });
    }
  });
  return <Provider store={store}>{props.children}</Provider>;
};
export default App;
