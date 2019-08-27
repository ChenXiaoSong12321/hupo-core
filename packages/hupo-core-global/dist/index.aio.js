/*!
 * @hupo/core-global 0.1.4 
 * Copyright 2019 . All Rights Reserved
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['core-global'] = {}));
}(this, function (exports) { 'use strict';

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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
