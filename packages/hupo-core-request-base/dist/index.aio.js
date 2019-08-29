/*!
 * @hupo/core-request-base 0.0.0 
 * Copyright 2019 . All Rights Reserved
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['core-request-base'] = {}));
}(this, function (exports) { 'use strict';

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

  exports.complete = complete;
  exports.defaultConfig = defaultConfig;
  exports.filterError = filterError;
  exports.filterResponse = filterResponse;
  exports.formatParams = formatParams;
  exports.getRequestIdentify = getRequestIdentify;
  exports.initialize = initialize;
  exports.pendding = pendding;
  exports.removePending = removePending;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
