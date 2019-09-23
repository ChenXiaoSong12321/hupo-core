// event.js
export default class Event {
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