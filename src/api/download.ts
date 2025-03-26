import service from "@/utils/request";

export function download() {
  return service({
    url: "/upload/stream",
    method: "get",
    responseType: "blob",
  });
}
