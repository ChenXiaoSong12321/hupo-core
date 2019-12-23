'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreGlobal = require('@hupo/core-global');
var coreUrl = require('@hupo/core-url');
var corePromise = require('@hupo/core-promise');

/*
  config数据结构
    options
      type：GET POST PUT DELETE ...
      url：请求uri，不包含baseUrl
    data： request body 数据
    params： request url 参数，json格式
    headers： request headers
    timeout： 超时，单位ms -- 只支持部分平台，其他平台在配置里
    setting： 其他配置

  response数据结构
    config：详见上
    status：http 状态码
    data：接口返回数据

  error数据结构，reject
    message：错误信息
    response：详见上
*/
coreGlobal.global._request = {};
const initialize = baseUrl => {
  console.log('baseUrl', baseUrl);
  coreGlobal.global._request.baseUrl = baseUrl;
}; // 默认配置

const defaultConfig = () => {
  return {
    timeout: 15000,
    // request timeout
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  };
}; // 格式化config

const formatParams = params => {
  const _params = {};
  Object.keys(params).forEach(key => {
    const item = params[key];
    const type = Object.prototype.toString.call(item);

    if (type.indexOf('Array') > -1) {
      _params[key] = item.join(',');
    }

    _params[key] = encodeURIComponent(type.indexOf('Object') > -1 ? JSON.stringify(item) : item);
  });
  return coreUrl.url.addUrlParam(_params);
}; // 获取请求唯一id// 获取请求唯一id

const getRequestIdentify = config => {
  return encodeURIComponent(JSON.stringify(config));
}; // 缓存正在请求的接口

const pendding = config => new Promise((resolve, reject) => {
  if (!coreGlobal.global._request.pendding) coreGlobal.global._request.pendding = {};
  const id = getRequestIdentify(config);

  if (coreGlobal.global._request.pendding[id]) {
    // 重复请求
    reject(corePromise.promise.createError({
      message: 'abort',
      info: 'repeat request',
      response: null
    }));
  } else {
    coreGlobal.global._request.pendding[id] = 1;
    resolve();
  }
}); // 结束正在请求的接口

const removePending = config => {
  const id = getRequestIdentify(config);
  delete coreGlobal.global._request.pendding[id];
}; // 请求完成处理

const filterResponse = response => {
  console.groupCollapsed(`%cresponse debug: %c${response.config.options.url}`, 'color: #999', 'color: #0076ff');
  console.log(response.config);
  console.log(response.data);
  console.groupEnd();
  return response;
}; // 通用异常处理

const filterError = response => new Promise((resolve, reject) => {
  let message = '';

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
      message = `请求地址出错: ${response.config.options.url}`;
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
  }

  if (response.status !== 200 && !message) {
    message = '系统繁忙，请稍后再试';
  }

  if (message) {
    reject(corePromise.promise.createError({
      message,
      response
    }));
  } else {
    resolve();
  }
});
const complete = response => new Promise((resolve, reject) => {
  const {
    data = {}
  } = response;
  const {
    code
  } = data;

  if (code === undefined) {
    // 如果没有 code 代表这不是业务接口 比如获取配置
    resolve(data);
  } else {
    // 有 code 代表这是一个后端接口 可以进行进一步的判断
    switch (code) {
      case 0:
        // [ 示例 ] code === 0 代表没有错误
        resolve(data.data);
        break;

      case -1:
        {
          const error = {
            message: '系统错误',
            response
          };
          reject(corePromise.promise.createError(error));
          break;
        }

      default:
        {
          const defaultError = {
            message: data.msg,
            response
          };
          reject(corePromise.promise.createError(defaultError));
          break;
        }
    }
  }
});

exports.complete = complete;
exports.defaultConfig = defaultConfig;
exports.filterError = filterError;
exports.filterResponse = filterResponse;
exports.formatParams = formatParams;
exports.getRequestIdentify = getRequestIdentify;
exports.initialize = initialize;
exports.pendding = pendding;
exports.removePending = removePending;
//# sourceMappingURL=index.js.map
