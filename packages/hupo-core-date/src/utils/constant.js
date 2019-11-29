export const SECONDS_A_MINUTE = 60
export const SECONDS_A_HOUR = SECONDS_A_MINUTE * 60
export const SECONDS_A_DAY = SECONDS_A_HOUR * 24
export const SECONDS_A_WEEK = SECONDS_A_DAY * 7

export const MILLISECONDS_A_SECOND = 1000

export const FORMAT_DEFAULT = 'YYYY-MM-DD HH:mm:ss'

// regex
export const REGEX_FORMAT = new RegExp('/\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS', 'g')

export const MS = 'millisecond'
export const S = 'second'
export const MIN = 'minute'
export const H = 'hour'
export const D = 'day'
export const W = 'week'
export const M = 'month'
export const Y = 'year'

export const MILLISECONDS = {
  millisecond: 1,
  second: 1000,
  minute: SECONDS_A_MINUTE * MILLISECONDS_A_SECOND,
  hour: SECONDS_A_HOUR * MILLISECONDS_A_SECOND,
  day: SECONDS_A_DAY * MILLISECONDS_A_SECOND,
  week: SECONDS_A_WEEK * MILLISECONDS_A_SECOND
}
