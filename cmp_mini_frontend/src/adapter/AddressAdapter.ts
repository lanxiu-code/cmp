import { AddressVO } from "@/servers";

export const buildAddressObjList = (addressList: AddressVO[]) => {
  if (!addressList) return [];
  const result = addressList.map((address) => {
    return {
      ...address,
      addressDetail: address.detail as string,
      selectedAddress: address.isDefault == 0 ? false : true,
    };
  });
  return result;
};
