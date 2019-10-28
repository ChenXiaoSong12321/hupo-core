import axios from 'axios';
import { initialize as baseInitialize, defaultConfig, formatParams, pendding, filterResponse, filterError, complete } from '@hupo/core-request-base';
import { exit } from '@hupo/core-promise'; // 超时

const CONFIG = defaultConfig();
const CancelToken = axios.CancelToken; // 创建一个 axios 实例

const service = axios.create(CONFIG); // 请求拦截器

service.interceptors.request.use(config => {
  config = formatParams(config);
  config.cancelToken = new CancelToken(abort => {
    pendding(config, abort);
  });
  return config;
}); // 响应拦截器

service.interceptors.response.use(response => filterResponse(response), error => {
  if (error && error.message !== 'abort') {
    if (error && error.response) {
      filterError(error.response);
    }
  }

  return exit(error);
});
export const request = async config => {
  // setting - 其他配置，例如responseType
  const {
    options,
    data = {},
    params = {},
    headers = {},
    timeout = CONFIG.timeout,
    setting = {}
  } = config;
  const response = await service({
    method: options.type,
    url: options.url,
    headers,
    params,
    data,
    timeout,
    ...setting
  });
  return complete(response, config);
};
export const initialize = baseUrl => {
  baseInitialize(baseUrl);
  service.defaults.baseURL = baseUrl;
};
export default request;