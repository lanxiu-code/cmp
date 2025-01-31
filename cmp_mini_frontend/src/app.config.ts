export default defineAppConfig({
  pages: [
    "pages/user/login/index",
    "pages/shop/index",
    "pages/shop/pay/index",
    "pages/shop/result/index",
    "pages/order/index",
    "pages/add/address/index",
    "pages/account/address/index",
    "pages/account/info/index",
    "pages/account/index",
    "pages/order/detail/index",
    "pages/shop/remark/index",
    "pages/home/index",
    "pages/index/index",
    "pages/user/register/index",
  ],
  tabBar: {
    // custom: true,
    color: "#000000",
    selectedColor: "#accbee",
    backgroundColor: "#ffffff",
    list: [
      // {
      //   pagePath: "pages/home/index",
      //   selectedIconPath: "assets/image/home-active.png",
      //   iconPath: "assets/image/home.png",
      //   text: "首页",
      // },
      {
        pagePath: "pages/shop/index",
        selectedIconPath: "assets/image/shopping-active.png",
        iconPath: "assets/image/shopping.png",
        text: "购物",
      },
      {
        pagePath: "pages/order/index",
        selectedIconPath: "assets/image/order-active.png",
        iconPath: "assets/image/order.png",
        text: "订单",
      },
      {
        pagePath: "pages/account/index",
        selectedIconPath: "assets/image/user-active.png",
        iconPath: "assets/image/user.png",
        text: "我的",
      },
    ],
  },
  window: {
    navigationStyle: "custom",
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
