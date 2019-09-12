'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreChannel = require('@hupo/core-channel');

var defaultData = {
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

const isAllScreen = () => /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;

async function calculate(cml) {
  const data = JSON.parse(JSON.stringify(defaultData));
  const system = await cml.getSystemInfo();
  data.viewportWidth = parseInt(system.viewportWidth);
  data.viewportHeight = parseInt(system.viewportHeight);
  coreChannel.channelInterface({
    H5() {
      if (isAllScreen()) data.isAllScreen = true;
    },

    WX_H5() {
      if (isAllScreen()) data.isAllScreen = true;
      data.capsuleHeight = 0;
    },

    WX_MINI_PROGRAM() {
      if (system.extraParams.platform == 'devtools') {
        data.capsuleHeight = 44;
      } else if (system.os == 'android') {
        data.capsuleHeight = 48;
      }

      data.statusBarHeight = system.extraParams.statusBarHeight;
      if (system.extraParams.screenHeight - data.statusBarHeight > 750 && system.os != 'android') data.isAllScreen = true;
    }

  });
  data.titleHeight = data.capsuleHeight + data.statusBarHeight;

  if (data.statusBarHeight >= 44) {
    data.isHighHead = true;
  }

  data.headerHeight = data.statusBarHeight + data.capsuleHeight; // 全面屏 底部留空距离 34px

  data.bottomHeight = data.isAllScreen ? 34 : 0;
  return data;
}

var index = (cml => promise.cache('calculate', calculate(cml)));

exports.default = index;
//# sourceMappingURL=index.js.map
