import { AddressVO } from "@/servers";

// 根据省市县生成详细地址
export const getAddress = (address: AddressVO) => {
  return `${address?.provinceName}${address?.cityName}${address?.countyName}${address?.townName}${address?.detail}`;
};
