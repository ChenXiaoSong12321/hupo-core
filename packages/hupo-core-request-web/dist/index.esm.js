/*!
 * @hupo/core-request-web 0.1.9 
 * Copyright 2019 . All Rights Reserved
 */

import axios from 'axios';
import { defaultConfig, formatParams, pendding, filterResponse, filterError, initialize as initialize$1, complete } from '@hupo/core-request-base';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var CONFIG = defaultConfig();
var CancelToken = axios.CancelToken; // 创建一个 axios 实例

var service = axios.create(CONFIG); // 请求拦截器

service.interceptors.request.use(function (config) {
  config = formatParams(config);
  config.cancelToken = new CancelToken(function (abort) {
    pendding(config, abort);
  });
  return config;
}); // 响应拦截器

service.interceptors.response.use(function (response) {
  return filterResponse(response);
}, function (error) {
  if (error && error.message !== 'abort') {
    if (error && error.response) {
      filterError(error.response);
    }
  }
});
var request =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(config) {
    var options, _config$data, data, _config$params, params, _config$headers, headers, _config$timeout, timeout, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = config.options, _config$data = config.data, data = _config$data === void 0 ? {} : _config$data, _config$params = config.params, params = _config$params === void 0 ? {} : _config$params, _config$headers = config.headers, headers = _config$headers === void 0 ? {} : _config$headers, _config$timeout = config.timeout, timeout = _config$timeout === void 0 ? CONFIG.timeout : _config$timeout;
            _context.next = 3;
            return service({
              method: options.type,
              url: options.url,
              headers: headers,
              params: params,
              data: data,
              timeout: timeout
            });

          case 3:
            response = _context.sent;
            return _context.abrupt("return", complete(response, config));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function request(_x) {
    return _ref.apply(this, arguments);
  };
}();
var initialize = function initialize(baseUrl) {
  initialize$1(baseUrl);
  service.defaults.baseURL = baseUrl;
};

export default request;
export { initialize, request };
