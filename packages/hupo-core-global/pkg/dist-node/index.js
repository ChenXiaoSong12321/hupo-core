'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// hupo
const getGlobal = () => {
  if (typeof window === 'undefined') {
    if (!global.$mall) global.$mall = {};
    return global.$mall;
  } else {
    if (!window.$mall) window.$mall = {};
    return window.$mall;
  }
};

const _global = getGlobal();

exports._global = _global;
exports.default = _global;
//# sourceMappingURL=index.js.map
