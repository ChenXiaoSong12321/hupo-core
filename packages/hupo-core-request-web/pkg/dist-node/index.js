'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var coreRequestBase = require('@hupo/core-request-base');
var corePromise = require('@hupo/core-promise');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

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

  return corePromise.exit(error);
});
const request = async config => {
  // setting - 其他配置，例如responseType
  const {
    options,
    data = {},
    params = {},
    headers = {},
    timeout = CONFIG.timeout,
    setting = {}
  } = config;
  const response = await service(_objectSpread2({
    method: options.type,
    url: options.url,
    headers,
    params,
    data,
    timeout
  }, setting));
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
