// 根据省市县生成详细地址
export const getAddress = (address: any) => {
  return `${address?.provinceName}${address?.cityName}${address?.countyName}${address?.townName}${address?.addressDetail}`;
};
