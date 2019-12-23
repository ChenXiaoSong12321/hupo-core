'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreChannel = require('@hupo/core-channel');

var defaultData = (() => {
  return {
    pixelRatio: 2,
    capsuleHeight: 40,
    // 胶囊高度
    statusBarHeight: 0,
    // 手机顶部状态栏高度
    headerHeight: 0,
    // 整个导航头高度
    bottomHeight: 0,
    isAllScreen: false,
    // 是否是全面屏手机
    isHighHead: false // 是否是刘海屏手机

  };
});

const calculate = () => {
  const data = defaultData();
  let system;

  try {
    system = uni.getSystemInfoSync();
  } catch (e) {
    return calculate();
  }

  data.pixelRatio = system.pixelRatio;
  data.rpxRatio = 750 / system.screenWidth; // #ifdef MP-WEIXIN

  if (system.platform == 'devtools') {
    data.capsuleHeight = 44 * data.rpxRatio;
  } else if (system.platform == 'android') {
    data.capsuleHeight = 48 * data.rpxRatio;
  }

  data.statusBarHeight = system.statusBarHeight * data.rpxRatio;
  if (system.screenHeight - data.statusBarHeight > 750 && system.platform != 'android') data.isAllScreen = true; // #endif
  // #ifdef H5

  const isAllScreen = () => /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;

  if (isAllScreen()) data.isAllScreen = true;
  data.capsuleHeight = data.capsuleHeight * data.rpxRatio;

  if (coreChannel.channel === coreChannel.channels.WX_H5) {
    data.capsuleHeight = 0;
  } // #endif


  if (system.statusBarHeight >= 44) {
    data.isHighHead = true;
  }

  data.headerHeight = data.statusBarHeight + data.capsuleHeight; // 全面屏 底部留空距离 34px

  data.bottomHeight = data.isAllScreen ? 34 * data.rpxRatio : 0;
  return data;
};

const viewport = calculate();

exports.viewport = viewport;
//# sourceMappingURL=index.js.map
