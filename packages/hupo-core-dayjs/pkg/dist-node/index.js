'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var dayjs = _interopDefault(require('dayjs'));
var dayjsPluginUTC = _interopDefault(require('dayjs-plugin-utc'));
require('dayjs/locale/zh-cn');

dayjs.locale('zh-cn');
dayjs.extend(dayjsPluginUTC); // use plugin

dayjs.formatDate = (time, type) => {
  if (isNaN(time)) return time;
  return dayjs.utc(parseInt(time)).utcOffset(480).format(type);
};

exports.default = dayjs;
//# sourceMappingURL=index.js.map
