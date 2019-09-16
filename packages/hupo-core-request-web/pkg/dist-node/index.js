'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var coreRequestBase = require('@hupo/core-request-base');

const CONFIG = coreRequestBase.defaultConfig();
const CancelToken = axios.CancelToken; // 创建一个 axios 实例

const service = axios.create(CONFIG); // 请求拦截器

service.interceptors.request.use(config => {
  config = coreRequestBase.formatParams(config);
  config.cancelToken = new CancelToken(abort => {
    coreRequestBase.pendding(config, abort);
  });
  return config;
}); // 响应拦截器

service.interceptors.response.use(response => coreRequestBase.filterResponse(response), error => {
  if (error && error.message !== 'abort') {
    if (error && error.response) {
      coreRequestBase.filterError(error.response);
    }
  }

  return Promise.reject(error);
});
const request = async config => {
  const {
    options,
    data = {},
    params = {},
    headers = {},
    timeout = CONFIG.timeout
  } = config;
  const response = await service({
    method: options.type,
    url: options.url,
    headers,
    params,
    data,
    timeout
  });
  return coreRequestBase.complete(response, config);
};
const initialize = baseUrl => {
  coreRequestBase.initialize(baseUrl);
  service.defaults.baseURL = baseUrl;
};

exports.default = request;
exports.initialize = initialize;
exports.request = request;
//# sourceMappingURL=index.js.map
