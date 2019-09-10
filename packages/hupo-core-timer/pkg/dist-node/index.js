'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = {
  beforeDestroy() {
    (this.__setTimeout__ || []).forEach(item => {
      clearTimeout(item);
    });
  },

  methods: {
    _setTimeout(fn, delay) {
      if (!this.__setTimeout__) this.__setTimeout__ = [];
      let timer = setTimeout(fn, delay);

      this.__setTimeout__.push(timer);

      return timer;
    }

  }
};

exports.default = index;
//# sourceMappingURL=index.js.map
