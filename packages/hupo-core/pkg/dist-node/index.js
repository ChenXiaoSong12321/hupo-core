'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var coreRequestWeb = require('@hupo/core-request-web');
var coreRequestWxApp = require('@hupo/core-request-wx-app');
var coreFormatUtils = require('@hupo/core-format-utils');
var coreGlobal = _interopDefault(require('@hupo/core-global'));
var corePromise = _interopDefault(require('@hupo/core-promise'));
var coreWxAppTools = _interopDefault(require('@hupo/core-wx-app-tools'));
var coreCmlBaseTree = require('@hupo/core-cml-base-tree');
var coreCmlEvent = require('@hupo/core-cml-event');
var coreDayjs = _interopDefault(require('@hupo/core-dayjs'));
var coreTimer = _interopDefault(require('@hupo/core-timer'));
var coreUrl = _interopDefault(require('@hupo/core-url'));
var coreRequestBase = _interopDefault(require('@hupo/core-request-base'));
var coreCmlViewport = _interopDefault(require('@hupo/core-cml-viewport'));
var coreNetworkWeb = _interopDefault(require('@hupo/core-network-web'));
var coreLoadScriptWeb = _interopDefault(require('@hupo/core-load-script-web'));
var coreChannel = require('@hupo/core-channel');

const requestWxapp = {
  request: coreRequestWxApp.request,
  initialize: coreRequestWxApp.initialize
};
const requestWeb = {
  request: coreRequestWeb.request,
  initialize: coreRequestWeb.initialize
};

exports.format = coreFormatUtils;
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
exports.viewport = coreCmlViewport;
exports.getNetworkType = coreNetworkWeb;
exports.loadScript = coreLoadScriptWeb;
Object.defineProperty(exports, 'channel', {
  enumerable: true,
  get: function () {
    return coreChannel.channel;
  }
});
Object.defineProperty(exports, 'channelInterface', {
  enumerable: true,
  get: function () {
    return coreChannel.channelInterface;
  }
});
exports.requestWeb = requestWeb;
exports.requestWxapp = requestWxapp;
//# sourceMappingURL=index.js.map
