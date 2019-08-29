/*!
 * @hupo/core-request-wx-app 0.1.9 
 * Copyright 2019 . All Rights Reserved
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['core-request-wx-app'] = {}));
}(this, function (exports) { 'use strict';

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

  /*!
   * @hupo/core-global 0.1.4 
   * Copyright 2019 . All Rights Reserved
   */
  // hupo
  var getGlobal = function getGlobal() {
    if (typeof window === 'undefined') {
      if (!global.$mall) global.$mall = {};
      return global.$mall;
    } else {
      if (!window.$mall) window.$mall = {};
      return window.$mall;
    }
  };

  var _global = getGlobal();

  /*!
   * @hupo/core-url 0.0.0 
   * Copyright 2019 . All Rights Reserved
   */
  /**
   * 给url上增加一个参数
   *
   * @param {*} param
   * @returns
   */


  var addUrlParam = function addUrlParam(param) {
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    for (var p in param) {
      if (url.indexOf(p) === -1) {
        var spe = url.indexOf('?') > -1 ? '&' : '?';
        url = /(\#\/.+)$/g.test(url) ? url.replace(/(\#\/.+)$/g, spe + "".concat(p, "=").concat(param[p]) + '$1') : url + spe + "".concat(p, "=").concat(param[p]);
      }
    }

    return url;
  };

  /*!
   * @hupo/core-request-base 0.0.0 
   * Copyright 2019 . All Rights Reserved
   */
  _global.__request_pending__ = {};

  var initialize = function initialize(baseUrl) {
    console.log('baseURL', baseUrl);
    _global.__base_url__ = baseUrl;
  }; // 默认配置


  var defaultConfig = function defaultConfig() {
    return {
      withCredentials: false,
      // send cookies when cross-domain requests
      timeout: 15000,
      // request timeout
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    };
  }; // 格式化get 参数


  var formatParams = function formatParams(config) {
    var params = {};
    Object.keys(config.params).forEach(function (key) {
      var type = Object.prototype.toString.call(config.params[key]);

      if (type.includes('Array')) {
        config.params[key] = config.params[key].join(',');
      }

      params[key] = encodeURIComponent(type.includes('Object') ? JSON.stringify(config.params[key]) : config.params[key]);
    });
    config.url = addUrlParam(params, config.url);
    delete config.params;
    return config;
  }; // 获取请求唯一id


  var getRequestIdentify = function getRequestIdentify(config) {
    return encodeURIComponent(JSON.stringify(config));
  }; // 缓存正在请求的接口


  var pendding = function pendding(config, abort) {
    var id = getRequestIdentify(config);
    removePending(id, true);
    _global.__request_pending__[id] = abort;
  }; // 结束正在请求的接口


  var removePending = function removePending(key) {
    var isRequest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (_global.__request_pending__[key] && isRequest) {
      _global.__request_pending__[key]('abort');
    }

    delete _global.__request_pending__[key];
  }; // 请求完成处理


  var filterResponse = function filterResponse(response) {
    console.groupCollapsed("%cresponse debug: %c".concat(response.config.url), 'color: #999', 'color: #0076ff');
    console.log(response.config);
    console.log(response.data);
    console.groupEnd();
    var id = getRequestIdentify(response.config);
    removePending(id);
    return response.data;
  }; // 通用异常处理


  var filterError = function filterError(response) {
    var message = '';

    switch (response.status) {
      case 400:
        message = '请求错误';
        break;

      case 401:
        message = '未授权，请登录';
        break;

      case 403:
        message = '拒绝访问';
        break;

      case 404:
        message = "\u8BF7\u6C42\u5730\u5740\u51FA\u9519: ".concat(response.config.url);
        break;

      case 408:
        message = '请求超时';
        break;

      case 500:
        message = '服务器内部错误';
        break;

      case 501:
        message = '服务未实现';
        break;

      case 502:
        message = '网关错误';
        break;

      case 503:
        message = '服务不可用';
        break;

      case 504:
        message = '网关超时';
        break;

      case 505:
        message = 'HTTP版本不受支持';
        break;

      default:
        break;
    }

    if (response.status !== 200 && !message) {
      message = '系统繁忙，请稍后再试';
    }

    if (message) {
      return Promise.reject({
        message: message,
        response: response
      });
    }
  };

  var complete = function complete(responseData, config) {
    var code = responseData.code;

    if (code === undefined) {
      // 如果没有 code 代表这不是业务接口 比如获取配置
      return responseData;
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return responseData.data;

        case -1:
          var error = {
            message: '系统错误',
            info: "".concat(responseData.msg, ": ").concat(config.options.url),
            data: responseData
          };
          return Promise.reject(error);

        default:
          var defaultError = {
            message: responseData.msg,
            info: "".concat(responseData.msg, ": ").concat(config.options.url),
            data: responseData
          };
          return Promise.reject(defaultError);
      }
    }
  };

  var CONFIG = defaultConfig();
  var base_url = '';
  var request =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_config) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof wx !== 'undefined')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", new Promise(function (resolve, reject) {
                var options = _config.options,
                    _config$data = _config.data,
                    data = _config$data === void 0 ? {} : _config$data,
                    _config$params = _config.params,
                    params = _config$params === void 0 ? {} : _config$params,
                    _config$headers = _config.headers,
                    headers = _config$headers === void 0 ? CONFIG.headers : _config$headers;
                var config = {
                  method: options.type,
                  url: "".concat(base_url).concat(options.url),
                  header: headers,
                  params: params,
                  data: data
                };
                config = formatParams(config);
                var request = wx.request(_objectSpread2({}, config, {
                  success: function success(response) {
                    response.config = config;
                    response.status = response.statusCode;
                    filterError(response);
                    response = filterResponse(response);
                    var data = complete(response, _config);
                    resolve(data);
                  },
                  fail: function fail(error) {
                    console.error('看看错误数据结构', error);
                    reject(error);
                  }
                }));
                pendding(config, request.abort);
              }));

            case 2:
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
  var initialize$1 = function initialize$1(baseUrl) {
    initialize(baseUrl);
    base_url = baseUrl;
  };

  exports.default = request;
  exports.initialize = initialize$1;
  exports.request = request;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
