export const timer = {
  beforeDestroy() {
    (this.__setTimeout__ || []).forEach(item => {
      clearTimeout(item);
    });
  },

  methods: {
    _setTimeout(fn, delay) {
      if (!this.__setTimeout__) this.__setTimeout__ = [];
      const timer = setTimeout(fn, delay);

      this.__setTimeout__.push(timer);

      return timer;
    }

  }
};