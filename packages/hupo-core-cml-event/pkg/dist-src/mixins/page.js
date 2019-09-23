import Event from '../Event.js';
export default {
  created() {
    this._event = new Event();
  },

  beforeDestroy() {
    this._off();

    delete this._event;
  },

  methods: {
    _getCurrentPageComponents(componentName) {
      return this._children[componentName] || [];
    },

    _on(event, handler) {
      this._event && this._event.on(event, handler);
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