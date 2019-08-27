/*!
 * @hupo/core-timer 0.1.5 
 * Copyright 2019 . All Rights Reserved
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['core-timer'] = factory());
}(this, function () { 'use strict';

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

  return index;

}));
