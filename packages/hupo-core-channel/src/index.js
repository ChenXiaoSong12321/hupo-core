import loadScript from "@hupo/core-load-script-web"
let isWx = typeof wx !== 'undefined'
const isH5 = typeof window !== 'undefined'
const isWechat = () => window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'

export const WX_H5 = 'WX_H5'
export const H5 = 'H5'
export const WX_MINI_PROGRAM = 'WX_MINI_PROGRAM'

function calc() {
  if(isH5 && (isWx || isWechat())){
    // 没有wx对象，需要添加weixin js sdk
    if(!isWx){
      loadScript('https://res2.wx.qq.com/open/js/jweixin-1.4.0.js').then(() => {
        // 加载完重新复制isWx
        isWx = typeof wx !== 'undefined'
      })
    }
    return WX_H5
  }else if(isWx){
    return WX_MINI_PROGRAM
  }else if(isH5){
    return H5
  }else{
    // default 小程序
    return WX_MINI_PROGRAM
  }
}

export const channel = calc()

export const channelInterface = callback => callback[channel] && callback[channel]()
