import Mock from "mockjs";
import user from "./user";

// 批量创建API
[...user].forEach((api) => {
  Mock.mock(api.url, api.method, api.template);
});
export default Mock;
