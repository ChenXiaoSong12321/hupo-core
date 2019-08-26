/*!
 * @hupo/core 0.0.5 
 * Copyright 2019 . All Rights Reserved
 */

export { default as global } from '@hupo/core-global';
export { default as promise } from '@hupo/core-promise';
export { default as wxTools } from '@hupo/core-wx-app-tools';
export { componentBaseTreeMixin, pageBaseTreeMixin } from '@hupo/core-cml-base-tree';
export { Event, componentEventMixin, pageEventMixin } from '@hupo/core-cml-event';
export { default as dayjs } from '@hupo/core-dayjs';

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

export { autoRequire2array, autoRequire2object };
