import * as requestUtils from '@hupo/core-request-utils';
import { promise } from '@hupo/core-promise';
import { global } from '@hupo/core-global';
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
    url: `${global._request.baseUrl}${options.url}${urlParams}`,
    data,
    header: headers,
    method: options.type.toUpperCase(),
    timeout
  };
};

export const send = async config => {
  const uniConfig = toUniConfig(config);
  const task = uni.request(uniConfig);
  await requestUtils.pendding(config);
  const [error, res] = await task;
  requestUtils.removePending(config);

  if (error) {
    return Promise.reject(promise.createError({
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
export const request = {
  initialize: requestUtils.initialize,
  send
};