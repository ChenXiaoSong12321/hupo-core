import * as C from './constant'
const ArrayFrom = num => Array.from({ length: num }, () => '')

const isUndefined = s => s === undefined

const newDate = defaultDate => {
  const date = defaultDate ? new Date(defaultDate) : new Date()
  const timezone = 8 // 目标时区时间，东八区
  const offsetGMT = date.getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
  const timestamp = date.getTime() // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
  date.setTime(timestamp + offsetGMT * C.MILLISECONDS.minute + timezone * C.MILLISECONDS.hour)
  return date
}

export const parseDate = date => {
  if (date === null || isUndefined(date)) return newDate()
  return newDate(date) // timestamp
}

export const padStart = (string, length, pad) => {
  const s = string.toString()
  if (!s || s.length >= length) return string
  return `${ArrayFrom((length + 1) - s.length).join(pad)}${string}`
}

export const padZoneStr = (negMinuts) => {
  const minutes = Math.abs(negMinuts)
  const hourOffset = Math.floor(minutes / 60)
  const minuteOffset = minutes % 60
  return `${negMinuts <= 0 ? '+' : '-'}${padStart(hourOffset, 2, '0')}:${padStart(minuteOffset, 2, '0')}`
}
export const prettyUnit = u => {
  const special = {
    M: C.M,
    y: C.Y,
    w: C.W,
    d: C.D,
    h: C.H,
    m: C.MIN,
    s: C.S,
    ms: C.MS
  }
  return special[u] || String(u || '').toLowerCase().replace(/s$/, '')
}
