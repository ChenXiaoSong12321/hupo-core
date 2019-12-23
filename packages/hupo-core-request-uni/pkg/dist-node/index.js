'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var requestUtils = require('@hupo/core-request-utils');
var corePromise = require('@hupo/core-promise');
var coreGlobal = require('@hupo/core-global');

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
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

const CONFIG = requestUtils.defaultConfig();

const toUniConfig = config => {
  const {
    options,
    data = {},
    params = {},
    headers = CONFIG.headers,
    timeout = CONFIG.timeout,
    setting = {}
  } = config;
  const urlParams = requestUtils.formatParams(params);
  return _objectSpread2({
    url: `${coreGlobal.global._request.baseUrl}${options.url}${urlParams}`,
    data,
    header: headers,
    method: options.type.toUpperCase(),
    timeout
  }, setting);
};

const send = async config => {
  const uniConfig = toUniConfig(config);
  const task = uni.request(uniConfig);
  await requestUtils.pendding(config);
  const [error, res] = await task;
  requestUtils.removePending(config);

  if (error) {
    return Promise.reject(corePromise.promise.createError({
      message: 'request fail',
      info: error,
      response: null
    }));
  }

  const response = {
    config,
    status: res.statusCode,
    data: res.data
  };
  await requestUtils.filterError(response);
  requestUtils.filterResponse(response);
  return requestUtils.complete(response);
};
const request = {
  initialize: requestUtils.initialize,
  send
};

exports.request = request;
exports.send = send;
//# sourceMappingURL=index.js.map
