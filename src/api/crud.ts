import service from "@/utils/request";

export function addUser(data: any) {
  return service({
    url: "/userinfo",
    method: "post",
    data,
  });
}

export const getList = (params: any) => {
  return service({
    url: "/userinfo",
    method: "get",
    params,
  });
};

export const delUser = (data: any) => {
  return service({
    url: `/userinfo/${data.id}`,
    method: "delete",
    data,
  });
};

export const updateUser = (data: any) => {
  return service({
    url: `/userinfo/${data.id}`,
    method: "patch",
    data,
  });
};

export const addTags = (data: any) => {
  return service({
    url: `/userinfo/add/tags`,
    method: "post",
    data,
  });
};
