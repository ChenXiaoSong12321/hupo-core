import defaultData from "./defaultData.js";
import { channel, channels } from '@hupo/core-channel';

const calculate = () => {
  const data = defaultData();
  let system;

  try {
    system = uni.getSystemInfoSync();
  } catch (e) {
    return calculate();
  }

  data.pixelRatio = system.pixelRatio; // #ifdef MP-WEIXIN

  if (system.platform == 'devtools') {
    data.capsuleHeight = 44 * data.pixelRatio;
  } else if (system.platform == 'android') {
    data.capsuleHeight = 48 * data.pixelRatio;
  }

  data.statusBarHeight = system.statusBarHeight * data.pixelRatio;
  if (system.screenHeight - data.statusBarHeight > 750 && system.platform != 'android') data.isAllScreen = true; // #endif
  // #ifdef H5

  const isAllScreen = () => /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;

  if (isAllScreen()) data.isAllScreen = true;

  if (channel === channels.WX_H5) {
    data.capsuleHeight = 0;
  } // #endif


  if (system.statusBarHeight >= 44) {
    data.isHighHead = true;
  }

  data.headerHeight = data.statusBarHeight + data.capsuleHeight; // 全面屏 底部留空距离 34px

  data.bottomHeight = data.isAllScreen ? 34 * data.pixelRatio : 0;
  return data;
};

export const viewport = calculate();