/*!
 * @hupo/core-timer 0.0.0 
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

      this.__setTimeout__.push(setTimeout(fn, delay));
    }
  }
};

module.exports = index;
