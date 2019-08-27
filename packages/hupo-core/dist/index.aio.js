/*!
 * @hupo/core 0.1.6 
 * Copyright 2019 . All Rights Reserved
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@hupo/core-global'), require('@hupo/core-promise'), require('@hupo/core-wx-app-tools'), require('@hupo/core-cml-base-tree'), require('@hupo/core-cml-event'), require('@hupo/core-timer')) :
	typeof define === 'function' && define.amd ? define(['exports', '@hupo/core-global', '@hupo/core-promise', '@hupo/core-wx-app-tools', '@hupo/core-cml-base-tree', '@hupo/core-cml-event', '@hupo/core-timer'], factory) :
	(global = global || self, factory(global.core = {}, global.coreGlobal, global.corePromise, global.coreWxAppTools, global.coreCmlBaseTree, global.coreCmlEvent, global.coreTimer));
}(this, function (exports, coreGlobal, corePromise, coreWxAppTools, coreCmlBaseTree, coreCmlEvent, coreTimer) { 'use strict';

	coreGlobal = coreGlobal && coreGlobal.hasOwnProperty('default') ? coreGlobal['default'] : coreGlobal;
	corePromise = corePromise && corePromise.hasOwnProperty('default') ? corePromise['default'] : corePromise;
	coreWxAppTools = coreWxAppTools && coreWxAppTools.hasOwnProperty('default') ? coreWxAppTools['default'] : coreWxAppTools;
	coreTimer = coreTimer && coreTimer.hasOwnProperty('default') ? coreTimer['default'] : coreTimer;



	exports.global = coreGlobal;
	exports.promise = corePromise;
	exports.wxTools = coreWxAppTools;
	Object.defineProperty(exports, 'componentBaseTreeMixin', {
		enumerable: true,
		get: function () {
			return coreCmlBaseTree.componentBaseTreeMixin;
		}
	});
	Object.defineProperty(exports, 'pageBaseTreeMixin', {
		enumerable: true,
		get: function () {
			return coreCmlBaseTree.pageBaseTreeMixin;
		}
	});
	Object.defineProperty(exports, 'Event', {
		enumerable: true,
		get: function () {
			return coreCmlEvent.Event;
		}
	});
	Object.defineProperty(exports, 'componentEventMixin', {
		enumerable: true,
		get: function () {
			return coreCmlEvent.componentEventMixin;
		}
	});
	Object.defineProperty(exports, 'pageEventMixin', {
		enumerable: true,
		get: function () {
			return coreCmlEvent.pageEventMixin;
		}
	});
	exports.timer = coreTimer;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
