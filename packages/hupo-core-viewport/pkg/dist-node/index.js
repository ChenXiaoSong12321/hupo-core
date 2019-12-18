'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreChannel = require('@hupo/core-channel');

var defaultData = (() => {
  return {
    capsuleHeight: 40,
    // 胶囊高度
    statusBarHeight: 0,
    // 手机顶部状态栏高度
    titleHeight: 136,
    // 整个导航头高度
    headerHeight: 0,
    bottomHeight: 0,
    isAllScreen: false,
    // 是否是全面屏手机
    isHighHead: false // 是否是刘海屏手机

  };
});

const isAllScreen = () => /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;

const calculate = () => {
  const data = defaultData(); // #ifdef MP-WEIXIN

  try {
    const system = uni.getSystemInfoSync();

    if (system.platform == 'devtools') {
      data.capsuleHeight = 44;
    } else if (system.platform == 'android') {
      data.capsuleHeight = 48;
    }

    data.statusBarHeight = system.statusBarHeight;
    if (system.screenHeight - data.statusBarHeight > 750 && system.platform != 'android') data.isAllScreen = true;
  } catch (e) {
    return calculate();
  } // #endif
  // #ifdef H5


  if (isAllScreen()) data.isAllScreen = true;

  if (coreChannel.channel === coreChannel.channels.WX_H5) {
    data.capsuleHeight = 0;
  } // #endif


  data.titleHeight = data.capsuleHeight + data.statusBarHeight;

  if (data.statusBarHeight >= 44) {
    data.isHighHead = true;
  }

  data.headerHeight = data.statusBarHeight + data.capsuleHeight; // 全面屏 底部留空距离 34px

  data.bottomHeight = data.isAllScreen ? 34 : 0;
  return data;
};

const viewport = calculate();

exports.viewport = viewport;
//# sourceMappingURL=index.js.map
