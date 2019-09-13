'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreChannel = require('@hupo/core-channel');

var defaultData = (() => {
  return {
    platform: 'ios',
    // 操作平台 用于适配胶囊高度
    capsuleHeight: 40,
    // 胶囊高度
    statusBarHeight: 0,
    // 手机顶部状态栏高度
    titleHeight: 136,
    // 整个导航头高度
    headerHeight: 0,
    bottomHeight: 0,
    viewportHeight: 0,
    // 手机屏幕高度
    isAllScreen: false,
    // 是否是全面屏手机
    isHighHead: false // 是否是刘海屏手机

  };
});

const isAllScreen = () => /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;

const calculate = () => {
  const data = defaultData();
  coreChannel.channelInterface({
    H5() {
      if (isAllScreen()) data.isAllScreen = true;
    },

    WX_H5() {
      if (isAllScreen()) data.isAllScreen = true;
      data.capsuleHeight = 0;
    },

    WX_MINI_PROGRAM() {
      const system = wx.getSystemInfoSync();

      if (system.platform == 'devtools') {
        data.capsuleHeight = 44;
      } else if (system.platform == 'android') {
        data.capsuleHeight = 48;
      }

      data.statusBarHeight = system.statusBarHeight;
      if (system.screenHeight - data.statusBarHeight > 750 && system.platform != 'android') data.isAllScreen = true;
    }

  });
  data.titleHeight = data.capsuleHeight + data.statusBarHeight;

  if (data.statusBarHeight >= 44) {
    data.isHighHead = true;
  }

  data.headerHeight = data.statusBarHeight + data.capsuleHeight; // 全面屏 底部留空距离 34px

  data.bottomHeight = data.isAllScreen ? 34 : 0;
  return data;
};

var index = calculate();

exports.default = index;
//# sourceMappingURL=index.js.map
