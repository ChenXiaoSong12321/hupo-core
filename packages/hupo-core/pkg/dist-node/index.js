'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var coreGlobal = _interopDefault(require('@hupo/core-global'));
var corePromise = _interopDefault(require('@hupo/core-promise'));
var coreWxAppTools = _interopDefault(require('@hupo/core-wx-app-tools'));
var coreCmlBaseTree = require('@hupo/core-cml-base-tree');
var coreCmlEvent = require('@hupo/core-cml-event');
var coreDayjs = _interopDefault(require('@hupo/core-dayjs'));
var coreTimer = _interopDefault(require('@hupo/core-timer'));
var coreUrl = _interopDefault(require('@hupo/core-url'));
var coreRequestBase = _interopDefault(require('@hupo/core-request-base'));
var coreRequestWeb = _interopDefault(require('@hupo/core-request-web'));
var coreRequestWxApp = _interopDefault(require('@hupo/core-request-wx-app'));



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
exports.dayjs = coreDayjs;
exports.timer = coreTimer;
exports.url = coreUrl;
exports.requestBase = coreRequestBase;
exports.requestWeb = coreRequestWeb;
exports.requestWxapp = coreRequestWxApp;
//# sourceMappingURL=index.js.map
