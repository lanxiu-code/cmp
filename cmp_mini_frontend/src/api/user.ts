import request from "@/utils/request";

export const login = () => {
  return request({
    url: "/api/user/login",
    method: "POST",
  });
};
