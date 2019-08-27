/*!
 * @hupo/core-timer 0.1.5 
 * Copyright 2019 . All Rights Reserved
 */

var index = {
  beforeDestroy: function beforeDestroy() {
    (this.__setTimeout__ || []).forEach(function (item) {
      clearTimeout(item);
    });
  },
  methods: {
    _setTimeout: function _setTimeout(fn, delay) {
      if (!this.__setTimeout__) this.__setTimeout__ = [];

      this.__setTimeout__.push(setTimeout(fn, delay));
    }
  }
};

export default index;
