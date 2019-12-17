'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isWx = typeof wx !== 'undefined';
const isH5 = typeof window !== 'undefined';

const isWechat = () => window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';

const WX_H5 = 'WX_H5';
const H5 = 'H5';
const WX_MINI_PROGRAM = 'WX_MINI_PROGRAM';

function calc() {
  if (isH5 && isWechat()) {
    // 没有wx对象，需要添加weixin js sdk
    if (!isWx) {
      // #ifdef H5
      const loadScript = require('@hupo/core-load-script-web');

      loadScript('https://res2.wx.qq.com/open/js/jweixin-1.4.0.js'); // #endif
    }

    return WX_H5;
  } else if (isWx) {
    return WX_MINI_PROGRAM;
  } else if (isH5) {
    return H5;
  } else {
    // default 小程序
    return WX_MINI_PROGRAM;
  }
}

const channel = calc();
const channelInterface = callback => callback[channel] && callback[channel]();

exports.H5 = H5;
exports.WX_H5 = WX_H5;
exports.WX_MINI_PROGRAM = WX_MINI_PROGRAM;
exports.channel = channel;
exports.channelInterface = channelInterface;
//# sourceMappingURL=index.js.map
