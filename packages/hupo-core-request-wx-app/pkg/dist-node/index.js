'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreRequestBase = require('@hupo/core-request-base');

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
let base_url = '';
const request = async _config => {
  if (typeof wx !== 'undefined') {
    return new Promise((resolve, reject) => {
      const {
        options,
        data = {},
        params = {},
        headers = CONFIG.headers
      } = _config;
      let config = {
        method: options.type,
        url: `${base_url}${options.url}`,
        header: headers,
        params,
        data
      };
      config = coreRequestBase.formatParams(config);
      const request = wx.request(_objectSpread2({}, config, {
        success(response) {
          response.config = config;
          response.status = response.statusCode;
          coreRequestBase.filterError(response);
          response = coreRequestBase.filterResponse(response);
          const data = coreRequestBase.complete(response, _config);
          resolve(data);
        },

        fail(error) {
          reject(error);
        }

      }));
      coreRequestBase.pendding(config, () => request.abort());
    });
  }
};
const initialize = baseUrl => {
  coreRequestBase.initialize(baseUrl);
  base_url = baseUrl;
};

exports.default = request;
exports.initialize = initialize;
exports.request = request;
//# sourceMappingURL=index.js.map
