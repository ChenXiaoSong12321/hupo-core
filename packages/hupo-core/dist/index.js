/*!
 * @hupo/core 0.1.7 
 * Copyright 2019 . All Rights Reserved
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var coreGlobal = _interopDefault(require('@hupo/core-global'));
var corePromise = _interopDefault(require('@hupo/core-promise'));
var coreWxAppTools = _interopDefault(require('@hupo/core-wx-app-tools'));
var coreCmlBaseTree = require('@hupo/core-cml-base-tree');
var coreCmlEvent = require('@hupo/core-cml-event');
var coreTimer = _interopDefault(require('@hupo/core-timer'));



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
