/*!
 * @hupo/core-wx-app-tools 0.1.4 
 * Copyright 2019 . All Rights Reserved
 */

// 特别指定的wx对象中不进行Promise封装的方法
var noPromiseMethods = {
  clearStorage: 1,
  hideToast: 1,
  hideLoading: 1,
  drawCanvas: 1,
  canIUse: 1,
  stopRecord: 1,
  pauseVoice: 1,
  stopVoice: 1,
  pauseBackgroundAudio: 1,
  stopBackgroundAudio: 1,
  showNavigationBarLoading: 1,
  hideNavigationBarLoading: 1,
  createAnimation: 1,
  createSelectorQuery: 1,
  hideKeyboard: 1,
  stopPullDownRefresh: 1,
  createWorker: 1,
  pageScrollTo: 1,
  reportAnalytics: 1
};
var wxTools = {};

if (typeof wx !== 'undefined') {
  Object.keys(wx).forEach(function (key) {
    if (noPromiseMethods[key] || // 特别指定的方法
    /^get\w*Manager$/.test(key) || // 获取manager的api
    /^create\w*Context$/.test(key) || // 创建上下文相关api
    /^(on|off)/.test(key) || // 以 on* 或 off开头的方法
    /\w+Sync$/.test(key) // 以 Sync 结尾的方法
    ) {
        // 不进行Promise封装
        wxTools[key] = function () {
          var res = wx[key].apply(wx, arguments);
          return res;
        };

        return;
      } // 其余方法自动Promise化


    wxTools[key] = function () {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // if (key === 'showModal') {
      //   // 按钮统一色调
      //   obj = Object.assign({
      //     confirmColor: color.primary
      //   }, obj)
      // }
      return new Promise(function (resolve, reject) {
        var originSuccess = obj.success;
        var originFail = obj.fail;

        obj.success = function (res) {
          originSuccess && originSuccess.apply(this, arguments);
          resolve(res);
        };

        obj.fail = function (res) {
          console.log(obj, res);
          originFail && originFail.apply(this, arguments);
          reject(res);
        };

        wx[key](obj);
      });
    };
  });
}

wxTools.$nextTick = function () {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  return new Promise(function (resolve, reject) {
    if (wxTools.nextTick) {
      wxTools.nextTick(resolve);
    } else {
      setTimeout(function () {
        resolve();
      }, delay);
    }
  });
};

export default wxTools;
