import * as C from './utils/constant'
import U from './utils/index'
import cn from './languages/zh-cn'

export const format = (date, formatStr) => {
  const _d = U.parseDate(date)
  const _y = _d.getFullYear()
  const _M = _d.getMonth()
  const _D = _d.getDate()
  const _W = _d.getDay()
  const _H = _d.getHours()
  const _m = _d.getMinutes()
  const _s = _d.getSeconds()
  const _ms = _d.getMilliseconds()
  const str = formatStr || C.FORMAT_DEFAULT
  const zoneStr = U.padZoneStr(_d.getTimezoneOffset())
  const {
    weekdays,
    months
  } = cn
  const getShort = (arr, index, full, length) => (
    (arr && arr[index]) || full[index].substr(0, length)
  )
  const regExp = new RegExp('/\[|\]/', 'g')
  const _format = function(match) {
    if (match.indexOf('[') > -1) return match.replace(regExp, '')
    switch (match) {
      case 'YY':
        return _y.toString().slice(-2)
      case 'YYYY':
        return _y + ''
      case 'M':
        return (_M + 1) + ''
      case 'MM':
        return U.padStart(_M + 1, 2, '0')
      case 'MMM':
        return getShort(cn.monthsShort, _M, months, 3)
      case 'MMMM':
        return months[_M]
      case 'D':
        return _D + ''
      case 'DD':
        return U.padStart(_D, 2, '0')
      case 'd':
        return _W + ''
      case 'dd':
        return getShort(cn.weekdaysMin, _W, weekdays, 2)
      case 'ddd':
        return getShort(cn.weekdaysShort, _W, weekdays, 3)
      case 'dddd':
        return weekdays[_W]
      case 'H':
        return _H + ''
      case 'HH':
        return U.padStart(_H, 2, '0')
      case 'h':
      case 'hh':
        if (_H === 0) return 12
        return U.padStart(_H < 13 ? _H : _H - 12, match === 'hh' ? 2 : 1, '0')
      case 'a':
        return _H < 12 ? 'am' : 'pm'
      case 'A':
        return _H < 12 ? 'AM' : 'PM'
      case 'm':
        return _m + ''
      case 'mm':
        return U.padStart(_m, 2, '0')
      case 's':
        return _s + ''
      case 'ss':
        return U.padStart(_s, 2, '0')
      case 'SSS':
        return U.padStart(_ms, 3, '0')
      case 'Z':
        return zoneStr
      default: // 'ZZ'
        return zoneStr.replace(':', '')
    }
  }

  return str.replace(C.REGEX_FORMAT, _format)
}
