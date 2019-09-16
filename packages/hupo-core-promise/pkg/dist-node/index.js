'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var global = _interopDefault(require('@hupo/core-global'));

const exit = message => Promise.reject(new Error(message));
const cache = async (id, promise) => {
  if (!global.promise) global.promise = {};

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
const del = id => {
  if (global.promise[id]) {
    global.promise[id] = null;
    delete global.promise[id];
  }
};
const delay = time => new Promise(resolve => {
  setTimeout(resolve, time);
});
var index = {
  exit,
  cache,
  del,
  delay
};

exports.cache = cache;
exports.default = index;
exports.del = del;
exports.delay = delay;
exports.exit = exit;
//# sourceMappingURL=index.js.map
