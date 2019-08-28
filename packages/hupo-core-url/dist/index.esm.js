/*!
 * @hupo/core-url 0.0.0 
 * Copyright 2019 . All Rights Reserved
 */

/**
 * 获取url上某个参数
 *
 * @param {*} name
 * @returns
 */
var getQueryString = function getQueryString(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var params = url.split('?');
  params.splice(0, 1);
  var r = params.join('&').replace(/#\//, '&').match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
/**
 * 删除url上某个参数
 *
 * @param {*} url
 * @param {*} name
 * @returns
 */

var deleteUrlParam = function deleteUrlParam(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var baseUrl = url.split('?')[0] + '?';
  var query = url.split('?')[1];
  var obj = {};

  if (query.indexOf(name) > -1) {
    var arr = query.split('&');

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=');
      obj[arr[i][0]] = arr[i][1];
    }

    delete obj[name];
    url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, '&');
  }

  return url;
};
/**
 * 给url上增加一个参数
 *
 * @param {*} param
 * @returns
 */

var addUrlParam = function addUrlParam(param) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  for (var p in param) {
    if (url.indexOf(p) === -1) {
      var spe = url.indexOf('?') > -1 ? '&' : '?';
      url = /(\#\/.+)$/g.test(url) ? url.replace(/(\#\/.+)$/g, spe + "".concat(p, "=").concat(param[p]) + '$1') : url + spe + "".concat(p, "=").concat(param[p]);
    }
  }

  return url;
};
var formatUrlParam = function formatUrlParam() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  // 使用正则来 两边的参数不可能是 &=? 所以去反集[^&=?]
  var regex = /([^&=?]+)=([^&=?]+)/g;
  var param = {};
  url.replace(regex, function () {
    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    param[arg[1]] = arg[2];
  });
  return param;
};
var index = {
  getQueryString: getQueryString,
  deleteUrlParam: deleteUrlParam,
  addUrlParam: addUrlParam,
  formatUrlParam: formatUrlParam
};

export default index;
export { addUrlParam, deleteUrlParam, formatUrlParam, getQueryString };
