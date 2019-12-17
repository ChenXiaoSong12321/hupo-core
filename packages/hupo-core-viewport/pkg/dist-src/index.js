import defaultData from "./defaultData.js";
import { channelInterface } from '@hupo/core-channel';

const isAllScreen = () => /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;

const calculate = () => {
  const data = defaultData();
  channelInterface({
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

export default calculate();