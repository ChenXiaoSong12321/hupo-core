import defaultData from './defaultData'
const calculate = () => {
  const data = defaultData()
  let system
  try {
    system = uni.getSystemInfoSync()
  } catch (e) {
    return calculate()
  }
  data.pixelRatio = system.pixelRatio
  const rpxRatio = 750 / system.screenWidth

  const rpx2px = rpx => rpx / rpxRatio
  const px2rpx = rpx => rpx * rpxRatio

  data.capsuleHeight = px2rpx(data.capsuleHeight)
  // #ifdef MP-WEIXIN
  if (system.platform == 'devtools') {
    data.capsuleHeight = px2rpx(44)
  } else if (system.platform == 'android') {
    data.capsuleHeight = px2rpx(48)
  }
  data.statusBarHeight = px2rpx(system.statusBarHeight)
  if (system.screenHeight - system.statusBarHeight > 750 && system.platform != 'android') data.isAllScreen = true
  // #endif
  // #ifdef H5
  const isAllScreen = () => /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
  if (isAllScreen()) data.isAllScreen = true
  // #endif
  if (system.statusBarHeight >= 44) {
    data.isHighHead = true
  }
  data.headerHeight = data.statusBarHeight + data.capsuleHeight
  // 全面屏 底部留空距离 34px
  data.bottomHeight = data.isAllScreen ? px2rpx(34) : 0
  data.rpx2px = rpx2px
  data.px2rpx = px2rpx
  return data
}
export const viewport = calculate()
