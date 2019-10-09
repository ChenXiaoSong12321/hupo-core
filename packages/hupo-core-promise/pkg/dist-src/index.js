import global from '@hupo/core-global';
if (!global.promise) global.promise = {};

const isRegExp = reg => Object.prototype.toString.call(reg) === '[object RegExp]';

export const exit = message => Promise.reject(new Error(message));
export const cache = async (id, promise) => {
  if (!global.promise[id]) {
    global.promise[id] = promise();
  }

  try {
    return await global.promise[id];
  } catch (error) {
    global.promise[id] = null;
    delete global.promise[id];
    return exit(error);
  }
};
export const del = id => {
  // 正则匹配
  if (isRegExp(id)) {
    Object.keys(global.promise).forEach(key => {
      if (id.test(key)) {
        global.promise[key] = null;
        delete global.promise[key];
      }
    });
  } else if (global.promise[id]) {
    global.promise[id] = null;
    delete global.promise[id];
  }
};
export const delay = time => new Promise(resolve => {
  setTimeout(resolve, time);
});
export default {
  exit,
  cache,
  del,
  delay
};