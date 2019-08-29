/*!
 * @hupo/core-request-wx-app 0.1.9 
 * Copyright 2019 . All Rights Reserved
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreRequestBase = require('@hupo/core-request-base');

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

var CONFIG = coreRequestBase.defaultConfig();
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
              config = coreRequestBase.formatParams(config);
              var request = wx.request(_objectSpread2({}, config, {
                success: function success(response) {
                  response.config = config;
                  response.status = response.statusCode;
                  coreRequestBase.filterError(response);
                  response = coreRequestBase.filterResponse(response);
                  var data = coreRequestBase.complete(response, _config);
                  resolve(data);
                },
                fail: function fail(error) {
                  console.error('看看错误数据结构', error);
                  reject(error);
                }
              }));
              coreRequestBase.pendding(config, request.abort);
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
var initialize = function initialize(baseUrl) {
  coreRequestBase.initialize(baseUrl);
  base_url = baseUrl;
};

exports.default = request;
exports.initialize = initialize;
exports.request = request;
