/*!
 * @hupo/core-timer 0.1.8 
 * Copyright 2019 . All Rights Reserved
 */

'use strict';

var index = {
  beforeDestroy: function beforeDestroy() {
    (this.__setTimeout__ || []).forEach(function (item) {
      clearTimeout(item);
    });
  },
  methods: {
    _setTimeout: function _setTimeout(fn, delay) {
      if (!this.__setTimeout__) this.__setTimeout__ = [];
      var timer = setTimeout(fn, delay);

      this.__setTimeout__.push(timer);

      return timer;
    }
  }
};

module.exports = index;
