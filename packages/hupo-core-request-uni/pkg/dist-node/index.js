'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var requestUtils = require('@hupo/core-request-utils');
var corePromise = require('@hupo/core-promise');
var coreGlobal = require('@hupo/core-global');

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
  return {
    url: `${coreGlobal.global._request.baseUrl}${options.url}${urlParams}`,
    data,
    header: headers,
    method: options.type.toUpperCase(),
    timeout
  };
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
