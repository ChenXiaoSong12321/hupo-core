import defaultData from './defaultData'
import {channelInterface} from '@hupo/core-channel'

const isAllScreen = () => /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812

async function calculate(cml) {
  const data = JSON.parse(JSON.stringify(defaultData))
  const system = await cml.getSystemInfo()
  data.viewportWidth = parseInt(system.viewportWidth)
  data.viewportHeight = parseInt(system.viewportHeight)
  channelInterface({
    H5(){
      if(isAllScreen())data.isAllScreen = true
    },
    WX_H5(){
      if(isAllScreen())data.isAllScreen = true
      data.capsuleHeight = 0
    },
    WX_MINI_PROGRAM(){
      if (system.extraParams.platform == 'devtools') {
        data.capsuleHeight = 44
      } else if (system.os == 'android') {
        data.capsuleHeight = 48
      }
      data.statusBarHeight = system.extraParams.statusBarHeight
      if (system.extraParams.screenHeight - data.statusBarHeight > 750 && system.os != 'android') data.isAllScreen = true
    }
  })
  data.titleHeight = data.capsuleHeight + data.statusBarHeight
  if (data.statusBarHeight >= 44) {
    data.isHighHead = true
  }
  data.headerHeight = data.statusBarHeight + data.capsuleHeight
  // 全面屏 底部留空距离 34px
  data.bottomHeight = data.isAllScreen ? 34 : 0
  return data
}
export default cml => promise.cache('calculate', calculate(cml))

