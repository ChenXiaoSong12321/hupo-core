'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreGlobal = require('@hupo/core-global');

if (!coreGlobal.global.promise) coreGlobal.global.promise = {};

const isRegExp = reg => Object.prototype.toString.call(reg) === '[object RegExp]';

const createError = data => {
  if (typeof data === 'string') {
    return new Error(data);
  } else if (data instanceof Error) {
    return data;
  } else {
    const message = data.message || data.msg || 'reject';
    const error = new Error(message);
    Object.keys(data).forEach(key => {
      if (key !== 'message') {
        error[key] = data[key];
      }
    });
    return error;
  }
};

const exit = data => {
  const error = createError(data);
  return Promise.reject(error);
};

const cache = async (id, promise) => {
  if (!coreGlobal.global.promise[id]) {
    coreGlobal.global.promise[id] = promise();
  }

  try {
    return await coreGlobal.global.promise[id];
  } catch (error) {
    coreGlobal.global.promise[id] = null;
    delete coreGlobal.global.promise[id];
    return exit(error);
  }
};

const del = id => {
  // 正则匹配
  if (isRegExp(id)) {
    Object.keys(coreGlobal.global.promise).forEach(key => {
      if (id.test(key)) {
        coreGlobal.global.promise[key] = null;
        delete coreGlobal.global.promise[key];
      }
    });
  } else if (coreGlobal.global.promise[id]) {
    coreGlobal.global.promise[id] = null;
    delete coreGlobal.global.promise[id];
  }
};

const delay = time => new Promise(resolve => {
  setTimeout(resolve, time);
});

const promise = {
  createError,
  exit,
  cache,
  del,
  delay
};

exports.promise = promise;
//# sourceMappingURL=index.js.map
