'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const SECONDS_A_MINUTE = 60;
const SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
const SECONDS_A_DAY = SECONDS_A_HOUR * 24;
const SECONDS_A_WEEK = SECONDS_A_DAY * 7;
const MILLISECONDS_A_SECOND = 1000;
const FORMAT_DEFAULT = 'YYYY-MM-DD HH:mm:ss'; // regex

const REGEX_FORMAT = new RegExp('/\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS', 'g');
const MS = 'millisecond';
const S = 'second';
const MIN = 'minute';
const H = 'hour';
const D = 'day';
const W = 'week';
const M = 'month';
const Y = 'year';
const MILLISECONDS = {
  millisecond: 1,
  second: 1000,
  minute: SECONDS_A_MINUTE * MILLISECONDS_A_SECOND,
  hour: SECONDS_A_HOUR * MILLISECONDS_A_SECOND,
  day: SECONDS_A_DAY * MILLISECONDS_A_SECOND,
  week: SECONDS_A_WEEK * MILLISECONDS_A_SECOND
};

const ArrayFrom = num => Array.from({
  length: num
}, () => '');

const isUndefined = s => s === undefined;

const setTimeZone = (date, timezone) => {
  const offsetGMT = date.getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
  // 判断时区是否是设置的时区

  if (offsetGMT / 60 + timezone !== 0) {
    const timestamp = date.valueOf(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数

    date.setTime(timestamp + offsetGMT * MILLISECONDS.minute + timezone * MILLISECONDS.hour);
  }

  return date;
};

const newDate = defaultDate => {
  const date = defaultDate ? new Date(defaultDate) : new Date();
  return setTimeZone(date, 8);
};

const parseDate = date => {
  if (date === null || isUndefined(date)) return newDate();
  return newDate(date); // timestamp
};
const padStart = (string, length, pad) => {
  const s = string.toString();
  if (!s || s.length >= length) return string;
  return `${ArrayFrom(length + 1 - s.length).join(pad)}${string}`;
};
const padZoneStr = negMinuts => {
  const minutes = Math.abs(negMinuts);
  const hourOffset = Math.floor(minutes / 60);
  const minuteOffset = minutes % 60;
  return `${negMinuts <= 0 ? '+' : '-'}${padStart(hourOffset, 2, '0')}:${padStart(minuteOffset, 2, '0')}`;
};
const prettyUnit = u => {
  const special = {
    M: M,
    y: Y,
    w: W,
    d: D,
    h: H,
    m: MIN,
    s: S,
    ms: MS
  };
  return special[u] || String(u || '').toLowerCase().replace(/s$/, '');
};

var cn = {
  name: 'zh-cn',
  weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  weekdaysMin: ['日', '一', '二', '三', '四', '五', '六'],
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
};

var format = ((date, formatStr) => {
  const _d = parseDate(date);

  const _y = _d.getFullYear();

  const _M = _d.getMonth();

  const _D = _d.getDate();

  const _W = _d.getDay();

  const _H = _d.getHours();

  const _m = _d.getMinutes();

  const _s = _d.getSeconds();

  const _ms = _d.getMilliseconds();

  const str = formatStr || FORMAT_DEFAULT;
  const zoneStr = padZoneStr(_d.getTimezoneOffset());
  const {
    weekdays,
    months
  } = cn;

  const getShort = (arr, index, full, length) => arr && arr[index] || full[index].substr(0, length);

  const regExp = new RegExp('/\[|\]/', 'g');

  const _format = function (match) {
    if (match.indexOf('[') > -1) return match.replace(regExp, '');

    switch (match) {
      case 'YY':
        return _y.toString().slice(-2);

      case 'YYYY':
        return _y + '';

      case 'M':
        return _M + 1 + '';

      case 'MM':
        return padStart(_M + 1, 2, '0');

      case 'MMM':
        return getShort(cn.monthsShort, _M, months, 3);

      case 'MMMM':
        return months[_M];

      case 'D':
        return _D + '';

      case 'DD':
        return padStart(_D, 2, '0');

      case 'd':
        return _W + '';

      case 'dd':
        return getShort(cn.weekdaysMin, _W, weekdays, 2);

      case 'ddd':
        return getShort(cn.weekdaysShort, _W, weekdays, 3);

      case 'dddd':
        return weekdays[_W];

      case 'H':
        return _H + '';

      case 'HH':
        return padStart(_H, 2, '0');

      case 'h':
      case 'hh':
        if (_H === 0) return 12;
        return padStart(_H < 13 ? _H : _H - 12, match === 'hh' ? 2 : 1, '0');

      case 'a':
        return _H < 12 ? 'am' : 'pm';

      case 'A':
        return _H < 12 ? 'AM' : 'PM';

      case 'm':
        return _m + '';

      case 'mm':
        return padStart(_m, 2, '0');

      case 's':
        return _s + '';

      case 'ss':
        return padStart(_s, 2, '0');

      case 'SSS':
        return padStart(_ms, 3, '0');

      case 'Z':
        return zoneStr;

      default:
        // 'ZZ'
        return zoneStr.replace(':', '');
    }
  };

  return str.replace(REGEX_FORMAT, _format);
});

const startOf = (date, units, isStartOf = true) => {
  const parseDate$1 = parseDate(date);
  const unit = prettyUnit(units);

  const instanceFactory = (d, m) => {
    const $y = parseDate$1.getFullYear();
    const ins = new Date($y, m, d);
    return isStartOf ? ins : endOf(ins, D);
  };

  const instanceFactorySet = (method, slice) => {
    const argumentStart = [0, 0, 0, 0];
    const argumentEnd = [23, 59, 59, 999];
    const arg = (isStartOf ? argumentStart : argumentEnd).slice(slice);
    return parseDate(parseDate$1[method](...arg));
  };

  const $W = parseDate$1.getDay();
  const $M = parseDate$1.getMonth();
  const $D = parseDate$1.getDate();

  switch (unit) {
    case Y:
      return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);

    case M:
      return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);

    case W:
      {
        return instanceFactory(isStartOf ? $D - $W : $D + (6 - $W), $M);
      }

    case D:
      return instanceFactorySet(`setHours`, 0);

    case H:
      return instanceFactorySet(`setMinutes`, 1);

    case MIN:
      return instanceFactorySet(`setSeconds`, 2);

    case S:
      return instanceFactorySet(`setMilliseconds`, 3);

    default:
      return parseDate$1;
  }
}; // 结束于


const endOf = (...arg) => startOf(...arg, false); // 是否相同


const isSame = (date1, date2, units) => {
  const parseDate2 = parseDate(date2);
  return startOf(date1, units) <= parseDate2 && parseDate2 <= endOf(date1, units);
}; // date1 is after to date2


const isAfter = (date1, date2, units) => parseDate(date2) < startOf(date1, units); // date1 is before to date2


const isBefore = (date1, date2, units) => endOf(date1, units) < parseDate(date2); // 增加时间


const add = (date, number, units) => {
  const parseDate$1 = parseDate(date);
  const unit = prettyUnit(units);
  const $y = parseDate$1.getFullYear();
  const $M = parseDate$1.getMonth();

  switch (unit) {
    case Y:
      return parseDate(parseDate$1.setFullYear($y + number));

    case M:
      return parseDate(parseDate$1.setMonth($M + number));

    default:
      return parseDate(parseDate$1.valueOf() + number * (MILLISECONDS[unit] || 0));
  }
}; // 减少时间


const subtract = (date, number, units) => add(date, number * -1, units);

const diff = (date1, date2, units) => {
  const parseDate1 = parseDate(date1);
  const parseDate2 = parseDate(date2);
  const unit = prettyUnit(units);
  const difference = parseDate1 - parseDate2;

  switch (unit) {
    case Y:
      return parseDate1.getFullYear() - parseDate2.getFullYear();

    case M:
      return parseDate1.getMonth() - parseDate2.getMonth();

    default:
      return Math.floor(difference / (MILLISECONDS[unit] || 1));
  }
};

var date = {
  startOf,
  endOf,
  add,
  subtract,
  isSame,
  isAfter,
  isBefore,
  diff,
  format,
  parseDate: parseDate
};

exports.dateUtils = date;
//# sourceMappingURL=index.js.map
