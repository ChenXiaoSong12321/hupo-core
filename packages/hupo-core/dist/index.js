/*!
 * @hupo/core 0.0.5 
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
var coreDayjs = _interopDefault(require('@hupo/core-dayjs'));

var autoRequire2object = function autoRequire2object(modulesFiles) {
  var modules = modulesFiles.keys().reduce(function (modules, modulePath) {
    // set './app.js' => 'app'
    var moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    var value = modulesFiles(modulePath);
    modules[moduleName] = value["default"];
    return modules;
  }, {});
  return modules;
};
var autoRequire2array = function autoRequire2array(modulesFiles) {
  var modules = modulesFiles.keys().map(function (item) {
    return modulesFiles(item)["default"];
  });
  return modules;
};

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
exports.autoRequire2array = autoRequire2array;
exports.autoRequire2object = autoRequire2object;
