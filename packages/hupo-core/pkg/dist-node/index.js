'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreGlobal = require('@hupo/core-global');
var coreChannel = require('@hupo/core-channel');
var coreDate = require('@hupo/core-date');
var coreFormatUtils = require('@hupo/core-format-utils');
var corePromise = require('@hupo/core-promise');
var coreTimer = require('@hupo/core-timer');
var coreUrl = require('@hupo/core-url');
var coreViewport = require('@hupo/core-viewport');



Object.keys(coreGlobal).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return coreGlobal[k];
		}
	});
});
Object.keys(coreChannel).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return coreChannel[k];
		}
	});
});
Object.keys(coreDate).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return coreDate[k];
		}
	});
});
Object.keys(coreFormatUtils).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return coreFormatUtils[k];
		}
	});
});
Object.keys(corePromise).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return corePromise[k];
		}
	});
});
Object.keys(coreTimer).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return coreTimer[k];
		}
	});
});
Object.keys(coreUrl).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return coreUrl[k];
		}
	});
});
Object.keys(coreViewport).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return coreViewport[k];
		}
	});
});
//# sourceMappingURL=index.js.map
