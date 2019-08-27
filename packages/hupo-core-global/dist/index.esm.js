/*!
 * @hupo/core-global 0.0.5 
 * Copyright 2019 . All Rights Reserved
 */

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

export default _global;
export { _global };
