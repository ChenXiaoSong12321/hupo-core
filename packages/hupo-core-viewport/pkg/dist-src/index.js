import defaultData from "./defaultData.js";
import { channel, channels } from '@hupo/core-channel';

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

  if (channel === channels.WX_H5) {
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

export const viewport = calculate();