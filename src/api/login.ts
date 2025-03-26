import service from "@/utils/request";

export function getCodeImg(params: any) {
  return service({
    url: "/v1/user/code",
    method: "get",
    params,
  });
}
export function login(data: object) {
  return service({
    url: "/v1/user/login",
    method: "post",
    data,
  });
}
