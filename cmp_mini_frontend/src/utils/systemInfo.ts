import Taro from "@tarojs/taro";

// 获取状态栏安全区域
export const getTopSafeArea = () => {
  const { safeArea } = Taro.getWindowInfo();
  return `${safeArea?.top}px`;
};

// 获取胶囊安全区域
export const getMenuSafeArea = () => {
  const menuInfo = Taro.getMenuButtonBoundingClientRect();
  return `${menuInfo?.top + menuInfo?.height}px`;
};

export const getTitleBarHeight = () => {
  const statusBarHeight = Taro.getWindowInfo().statusBarHeight || 30;
  const { top, height } = Taro.getMenuButtonBoundingClientRect();
  return `${(top - statusBarHeight) * 2 + height}px`;
};
