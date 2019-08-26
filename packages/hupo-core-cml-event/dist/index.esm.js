/*!
 * @hupo/core-cml-event 0.0.0 
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

// event.js
var Event =
/*#__PURE__*/
function () {
  function Event() {
    _classCallCheck(this, Event);

    this.events = {};
  }

  _createClass(Event, [{
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

var component = {
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

var page = {
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

export { Event, component as componentEventMixin, page as pageEventMixin };
