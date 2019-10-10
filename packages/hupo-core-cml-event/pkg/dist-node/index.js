'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var global = _interopDefault(require('@hupo/core-global'));

// event.js
class Event {
  constructor() {
    this.events = {};
    this.stores = {};
  }

  on(event, handler) {
    if (typeof handler != 'function') {
      console.error('callback handler must be a function');
      return;
    }

    (this.events[event] = this.events[event] || []).push(handler);

    if (this.stores[event]) {
      handler(...this.stores[event]);
    }
  }

  emit(event) {
    if (this.events[event] && this.events[event].length > 0) {
      const events = this.events[event];

      if (events) {
        const args = [].slice.call(arguments, 1);

        for (let i = 0, len = events.length; i < len; i++) {
          events[i].apply(null, args);
        }
      }
    }
  }

  emitCache(event, ...args) {
    if (args.length) {
      this.stores[event] = args;
      this.emit(event, ...args);
    }
  }

  off(event, handler) {
    this.events = this.events || {}; // all

    if (!arguments.length) {
      this.events = {};
      this.stores = {};
      return;
    }

    if (arguments.length === 1 && this.stores[event]) {
      delete this.stores[event];
    }

    const events = this.events[event];
    if (!events) return; // remove all handlers

    if (arguments.length === 1) {
      delete this.events[event];
      return;
    } // remove specific handler


    events.splice(events.indexOf(handler) >>> 0, 1);
    this.events[event] = events;
    return;
  }

}

const getViewId = instance => instance._uid ? instance._uid : instance.__wxWebviewId__ || instance.getPageId();

var component = {
  beforeDestroy() {
    this._off();

    delete this._event;
  },

  methods: {
    _getCurrentPageComponents(componentName) {
      const viewId = getViewId(this);
      const page = global._baseTree.pages[viewId];
      return page && page._children ? page._children[componentName] : [];
    },

    _on(event, handler) {
      if (!this._event) this._event = new Event();

      this._event.on(event, handler);
    },

    _off(...arg) {
      this._event && this._event.off(...arg);
    },

    _emit(...arg) {
      this._event && this._event.emit(...arg);
    },

    _emitCache(...arg) {
      this._event && this._event.emitCache(...arg);
    },

    _broadcast(componentName, ...arg) {
      const components = this._getCurrentPageComponents(componentName);

      components.forEach(item => {
        item._event.emit(...arg);
      });
    }

  }
};

var page = {
  beforeDestroy() {
    this._off();

    delete this._event;
  },

  methods: {
    _getCurrentPageComponents(componentName) {
      return this._children[componentName] || [];
    },

    _on(event, handler) {
      if (!this._event) this._event = new Event();

      this._event.on(event, handler);
    },

    _off(...arg) {
      this._event && this._event.off(...arg);
    },

    _emit(...arg) {
      this._event && this._event.emit(...arg);
    },

    _emitCache(...arg) {
      this._event && this._event.emitCache(...arg);
    },

    _broadcast(componentName, ...args) {
      const components = this._getCurrentPageComponents(componentName);

      components.forEach(item => {
        item._event.emit(...args);
      });
    }

  }
};

global._eventbus = new Event();

exports.Event = Event;
exports.componentEventMixin = component;
exports.pageEventMixin = page;
//# sourceMappingURL=index.js.map
