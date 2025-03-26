import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import QS from "qs";
// 创建一个 axios 实例
const service = axios.create({
  baseURL: "/api",
  timeout: 60000, // 请求超时时间毫秒
  withCredentials: false, // 异步请求携带cookie
  //headers: {
  //	// 设置后端需要的传参类型
  //	'Content-Type': 'application/json',
  //	'token': 'your token',
  //	'X-Requested-With': 'XMLHttpRequest',
  //},
});
//拦截器 请求拦截
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

//拦截器 响应拦截
service.interceptors.response.use(
  (response: any): any => {
    if (response.status == 200 || response.status == 201) {
      return response.data;
    } else {
      console.log("请求错误");
    }
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params: Object) {
  return new Promise((resolve, reject) => {
    service
      .get(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: Object) {
  return new Promise((resolve, reject) => {
    service
      .post(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
export default service;
