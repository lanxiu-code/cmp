import { PropsWithChildren, Component } from "react";
import "./app.scss";
import "@nutui/nutui-react-taro/dist/style.css";
import { Provider } from "react-redux";
import store from "./store";
import "./mock";
import "./assets/iconfont/iconfont.css";
// function App({ children }) {
//   useLaunch(() => {
//     console.log("App launched.");
//   });
//   // children 是将要会渲染的页面
//   return <Provider store={store}>children</Provider>;
// }

class App extends Component {
  componentDidMount(): void {
    console.log("App mounted.");
  }
  render() {
    //@ts-ignore
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
export default App;
