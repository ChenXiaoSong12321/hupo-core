'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// event.js
class Event {
  constructor() {
    this.events = {};
  }

  on(event, handler) {
    if (typeof handler != 'function') {
      console.error('callback handler must be a function');
      return;
    }

    (this.events[event] = this.events[event] || []).push(handler);
  }

  emit(event) {
    if (this.events[event] && this.events[event].length > 0) {
      let events = this.events[event];

      if (events) {
        const args = [].slice.call(arguments, 1);

        for (let i = 0, len = events.length; i < len; i++) {
          events[i].apply(null, args);
        }
      }
    }
  }

  off(event, handler) {
    this.events = this.events || {}; // all

    if (!arguments.length) {
      this.events = {};
      return;
    }

    let events = this.events[event];
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

var component = {
  created() {
    this._event = new Event();
  },

  beforeDestroy() {
    this._off();

    delete this._event;
  },

  methods: {
    _getCurrentPageComponents(componentName) {
      return this._page._children[componentName] || [];
    },

    _on(...arg) {
      this._event.on(...arg);
    },

    _off(...arg) {
      this._event.off(...arg);
    },

    _emit(...arg) {
      this._event.emit(...arg);
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
  methods: {
    _getCurrentPageComponents(componentName) {
      return this._children[componentName] || [];
    },

    _broadcast(componentName, ...arg) {
      const components = this._getCurrentPageComponents(componentName);

      components.forEach(item => {
        item._event.emit(...arg);
      });
    }

  }
};

exports.Event = Event;
exports.componentEventMixin = component;
exports.pageEventMixin = page;
//# sourceMappingURL=index.js.map
