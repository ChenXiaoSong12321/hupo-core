/*!
 * @hupo/core-global 0.1.4 
 * Copyright 2019 . All Rights Reserved
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// hupo
var getGlobal = function getGlobal() {
  if (typeof window === 'undefined') {
    if (!global.$mall) global.$mall = {};
    return global.$mall;
  } else {
    if (!window.$mall) window.$mall = {};
    return window.$mall;
  }
};

var _global = getGlobal();

exports._global = _global;
exports.default = _global;
