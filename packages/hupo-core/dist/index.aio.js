/*!
 * @hupo/core 0.0.8 
 * Copyright 2019 . All Rights Reserved
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@hupo/core-global')) :
  typeof define === 'function' && define.amd ? define(['exports', '@hupo/core-global'], factory) :
  (global = global || self, factory(global.core = {}, global.coreGlobal));
}(this, function (exports, coreGlobal) { 'use strict';

  coreGlobal = coreGlobal && coreGlobal.hasOwnProperty('default') ? coreGlobal['default'] : coreGlobal;

  /*!
   * @hupo/core-global 0.0.1 
   * Copyright 2019 . All Rights Reserved
   */
  // hupo
  var _global = typeof window === 'undefined' ? global : window;

  /*!
   * @hupo/core-promise 0.0.0 
   * Copyright 2019 . All Rights Reserved
   */

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var exit = function exit(error) {
    return Promise.reject(new Error(error));
  };

  var cache =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(id, promise) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_global.promise) _global.promise = {};

              if (!_global.promise[id]) {
                _global.promise[id] = promise();
              }

              _context.prev = 2;
              _context.next = 5;
              return _global.promise[id];

            case 5:
              return _context.abrupt("return", _context.sent);

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              _global.promise[id] = null;
              delete _global.promise[id];
              return _context.abrupt("return", exit(_context.t0));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 8]]);
    }));

    return function cache(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var del = function del(id) {
    if (_global.promise[id]) {
      _global.promise[id] = null;
      delete _global.promise[id];
    }
  };

  var delay = function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  };

  var index = {
    exit: exit,
    cache: cache,
    del: del,
    delay: delay
  };

  /*!
   * @hupo/core-wx-app-tools 0.0.0 
   * Copyright 2019 . All Rights Reserved
   */
  // 特别指定的wx对象中不进行Promise封装的方法
  var noPromiseMethods = {
    clearStorage: 1,
    hideToast: 1,
    hideLoading: 1,
    drawCanvas: 1,
    canIUse: 1,
    stopRecord: 1,
    pauseVoice: 1,
    stopVoice: 1,
    pauseBackgroundAudio: 1,
    stopBackgroundAudio: 1,
    showNavigationBarLoading: 1,
    hideNavigationBarLoading: 1,
    createAnimation: 1,
    createSelectorQuery: 1,
    hideKeyboard: 1,
    stopPullDownRefresh: 1,
    createWorker: 1,
    pageScrollTo: 1,
    reportAnalytics: 1
  };
  var wxTools = {};

  if (typeof wx !== 'undefined') {
    Object.keys(wx).forEach(function (key) {
      if (noPromiseMethods[key] || // 特别指定的方法
      /^get\w*Manager$/.test(key) || // 获取manager的api
      /^create\w*Context$/.test(key) || // 创建上下文相关api
      /^(on|off)/.test(key) || // 以 on* 或 off开头的方法
      /\w+Sync$/.test(key) // 以 Sync 结尾的方法
      ) {
          // 不进行Promise封装
          wxTools[key] = function () {
            var res = wx[key].apply(wx, arguments);
            return res;
          };

          return;
        } // 其余方法自动Promise化


      wxTools[key] = function () {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; // if (key === 'showModal') {
        //   // 按钮统一色调
        //   obj = Object.assign({
        //     confirmColor: color.primary
        //   }, obj)
        // }

        return new Promise(function (resolve, reject) {
          var originSuccess = obj.success;
          var originFail = obj.fail;

          obj.success = function (res) {
            originSuccess && originSuccess.apply(this, arguments);
            resolve(res);
          };

          obj.fail = function (res) {
            console.log(obj, res);
            originFail && originFail.apply(this, arguments);
            reject(res);
          };

          wx[key](obj);
        });
      };
    });
  }

  wxTools.$nextTick = function () {
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
    return new Promise(function (resolve, reject) {
      if (wxTools.nextTick) {
        wxTools.nextTick(resolve);
      } else {
        setTimeout(function () {
          resolve();
        }, delay);
      }
    });
  };

  /*!
   * @hupo/core-cml-base-tree 0.0.2 
   * Copyright 2019 . All Rights Reserved
   */

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
    return instance.__wxWebviewId__ || instance.$route.path;
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

        var viewId = getViewId(component);
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

        var viewId = getViewId(component);
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
  _global._baseTree = new BaseTree();

  /*!
   * @hupo/core-cml-event 0.0.0 
   * Copyright 2019 . All Rights Reserved
   */
  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  } // event.js


  var Event =
  /*#__PURE__*/
  function () {
    function Event() {
      _classCallCheck$1(this, Event);

      this.events = {};
    }

    _createClass$1(Event, [{
      key: "on",
      value: function on(event, handler) {
        if (typeof handler != 'function') {
          console.error('callback handler must be a function');
          return;
        }

        (this.events[event] = this.events[event] || []).push(handler);
      }
    }, {
      key: "emit",
      value: function emit(event) {
        if (this.events[event] && this.events[event].length > 0) {
          var events = this.events[event];

          if (events) {
            var args = [].slice.call(arguments, 1);

            for (var i = 0, len = events.length; i < len; i++) {
              events[i].apply(null, args);
            }
          }
        }
      }
    }, {
      key: "off",
      value: function off(event, handler) {
        this.events = this.events || {}; // all

        if (!arguments.length) {
          this.events = {};
          return;
        }

        var events = this.events[event];
        if (!events) return; // remove all handlers

        if (arguments.length === 1) {
          delete this.events[event];
          return;
        } // remove specific handler


        events.splice(events.indexOf(handler) >>> 0, 1);
        this.events[event] = events;
        return;
      }
    }]);

    return Event;
  }();

  var component$1 = {
    created: function created() {
      this._event = new Event();
    },
    beforeDestroy: function beforeDestroy() {
      this._off();

      delete this._event;
    },
    methods: {
      _getCurrentPageComponents: function _getCurrentPageComponents(componentName) {
        return this._page._children[componentName] || [];
      },
      _on: function _on() {
        var _this$_event;

        (_this$_event = this._event).on.apply(_this$_event, arguments);
      },
      _off: function _off() {
        var _this$_event2;

        (_this$_event2 = this._event).off.apply(_this$_event2, arguments);
      },
      _emit: function _emit() {
        var _this$_event3;

        (_this$_event3 = this._event).emit.apply(_this$_event3, arguments);
      },
      _broadcast: function _broadcast(componentName) {
        for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          arg[_key - 1] = arguments[_key];
        }

        var components = this._getCurrentPageComponents(componentName);

        components.forEach(function (item) {
          var _item$_event;

          (_item$_event = item._event).emit.apply(_item$_event, arg);
        });
      }
    }
  };
  var page$1 = {
    methods: {
      _getCurrentPageComponents: function _getCurrentPageComponents(componentName) {
        return this._children[componentName] || [];
      },
      _broadcast: function _broadcast(componentName) {
        for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          arg[_key - 1] = arguments[_key];
        }

        var components = this._getCurrentPageComponents(componentName);

        components.forEach(function (item) {
          var _item$_event;

          (_item$_event = item._event).emit.apply(_item$_event, arg);
        });
      }
    }
  };

  // export { default as dayjs} from "@hupo/core-dayjs";

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
  exports.Event = Event;
  exports.autoRequire2array = autoRequire2array;
  exports.autoRequire2object = autoRequire2object;
  exports.componentBaseTreeMixin = component;
  exports.componentEventMixin = component$1;
  exports.pageBaseTreeMixin = page;
  exports.pageEventMixin = page$1;
  exports.promise = index;
  exports.wxTools = wxTools;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
