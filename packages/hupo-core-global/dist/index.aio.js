/*!
 * @hupo/core-global 0.0.0 
 * Copyright 2019 . All Rights Reserved
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global['core-global'] = {}));
}(this, function (exports) { 'use strict';

	// hupo
	var _global = typeof window === 'undefined' ? global : window;

	exports._global = _global;
	exports.default = _global;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
