/*!
 * @hupo/core-cml-base-tree 0.1.4 
 * Copyright 2019 . All Rights Reserved
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@hupo/core-global')) :
  typeof define === 'function' && define.amd ? define(['exports', '@hupo/core-global'], factory) :
  (global = global || self, factory(global['core-cml-base-tree'] = {}, global.global));
}(this, function (exports, global) { 'use strict';

  global = global && global.hasOwnProperty('default') ? global['default'] : global;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var getViewId = function getViewId(instance) {
    return instance.__wxWebviewId__ || instance._uid;
  };
  var getComponentName = function getComponentName(instance) {
    return instance.__cml_originOptions__ ? instance.__cml_originOptions__.componentName : instance.$options.componentName;
  };

  var BaseTree =
  /*#__PURE__*/
  function () {
    function BaseTree() {
      _classCallCheck(this, BaseTree);

      this.initialize();
    }

    _createClass(BaseTree, [{
      key: "initialize",
      value: function initialize() {
        this.pages = {};
      }
    }, {
      key: "addPage",
      value: function addPage(page) {
        var viewId = getViewId(page);
        page._children = {};
        if (!this.pages[viewId]) this.pages[viewId] = page;
      }
    }, {
      key: "removePage",
      value: function removePage(page) {
        var viewId = getViewId(page);
        delete this.pages[viewId];
      }
    }, {
      key: "addComponent",
      value: function addComponent(component) {
        var componentName = getComponentName(component);

        if (!componentName) {
          console.warn('you have to add componentName of component', component);
          return;
        }

        var instance = component.$route ? component.$route.matched[0].instances["default"] : component;
        var viewId = getViewId(instance);
        var page = this.pages[viewId];
        if (!page._children[componentName]) page._children[componentName] = [];

        page._children[componentName].push(component);

        component._page = page;
      }
    }, {
      key: "removeComponent",
      value: function removeComponent(component) {
        var componentName = getComponentName(component);

        if (!componentName) {
          console.warn('you have to add componentName of component', component);
          return;
        }

        var viewId = getViewId(component._page);
        var page = this.pages[viewId];

        if (page && page._children[componentName]) {
          page._children[componentName].splice(page._children[componentName].indexOf(component) >>> 0, 1);
        }
      }
    }]);

    return BaseTree;
  }();

  var component = {
    created: function created() {
      global._baseTree.addComponent(this);
    },
    beforeDestroy: function beforeDestroy() {
      global._baseTree.removeComponent(this);
    }
  };

  var page = {
    created: function created() {
      global._baseTree.addPage(this);
    },
    beforeDestroy: function beforeDestroy() {
      global._baseTree.removePage(this);
    }
  };

  global._baseTree = new BaseTree();

  exports.componentBaseTreeMixin = component;
  exports.pageBaseTreeMixin = page;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
