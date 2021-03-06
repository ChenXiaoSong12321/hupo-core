'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 获取url上某个参数
 *
 * @param {*} name
 * @returns
 */
const getQueryString = (name, url = '') => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const params = url.split('?');
  params.splice(0, 1);
  const r = params.join('&').replace(/#\//, '&').match(reg);
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


const deleteUrlParam = (name, url = '') => {
  const baseUrl = url.split('?')[0] + '?';
  const query = url.split('?')[1];
  const obj = {};

  if (query.indexOf(name) > -1) {
    const arr = query.split('&');

    for (let i = 0; i < arr.length; i++) {
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


const addUrlParam = (param, url = '') => {
  for (const p in param) {
    if (url.indexOf(`${p}=`) === -1) {
      const spe = url.indexOf('?') > -1 ? '&' : '?';
      url = /(\#\/.+)$/g.test(url) ? url.replace(/(\#\/.+)$/g, spe + `${p}=${param[p]}` + '$1') : url + spe + `${p}=${param[p]}`;
    }
  }

  return url;
};

const formatUrlParam = (url = '') => {
  // 使用正则来 两边的参数不可能是 &=? 所以去反集[^&=?]
  const regex = /([^&=?]+)=([^&=?]+)/g;
  const param = {};
  url.replace(regex, (...arg) => {
    param[arg[1]] = arg[2];
  });
  return param;
};

const url = {
  getQueryString,
  deleteUrlParam,
  addUrlParam,
  formatUrlParam
};

exports.url = url;
//# sourceMappingURL=index.js.map
