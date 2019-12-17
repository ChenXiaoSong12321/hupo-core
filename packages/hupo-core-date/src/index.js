import * as U from './utils/index'
import * as C from './utils/constant'
import format from './format'

// 开始于
const startOf = (date, units, isStartOf = true) => {
  const parseDate = U.parseDate(date)
  const unit = U.prettyUnit(units)

  const instanceFactory = (d, m) => {
    const $y = parseDate.getFullYear()
    const ins = new Date($y, m, d)
    return isStartOf ? ins : endOf(ins, C.D)
  }
  const instanceFactorySet = (method, slice) => {
    const argumentStart = [0, 0, 0, 0]
    const argumentEnd = [23, 59, 59, 999]
    const arg = (isStartOf ? argumentStart : argumentEnd).slice(slice)
    return U.parseDate(parseDate[method](...arg))
  }

  const $W = parseDate.getDay()
  const $M = parseDate.getMonth()
  const $D = parseDate.getDate()

  switch (unit) {
    case C.Y:
      return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11)
    case C.M:
      return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1)
    case C.W: {
      return instanceFactory(isStartOf ? $D - $W : $D + (6 - $W), $M)
    }
    case C.D:
      return instanceFactorySet(`setHours`, 0)
    case C.H:
      return instanceFactorySet(`setMinutes`, 1)
    case C.MIN:
      return instanceFactorySet(`setSeconds`, 2)
    case C.S:
      return instanceFactorySet(`setMilliseconds`, 3)
    default:
      return parseDate
  }
}

// 结束于
const endOf = (...arg) => startOf(...arg, false)

// 是否相同
const isSame = (date1, date2, units) => {
  const parseDate2 = U.parseDate(date2)
  return startOf(date1, units) <= parseDate2 && parseDate2 <= endOf(date1, units)
}

// date1 is after to date2
const isAfter = (date1, date2, units) => U.parseDate(date2) < startOf(date1, units)

// date1 is before to date2
const isBefore = (date1, date2, units) => endOf(date1, units) < U.parseDate(date2)

// 增加时间
const add = (date, number, units) => {
  const parseDate = U.parseDate(date)
  const unit = U.prettyUnit(units)
  const $y = parseDate.getFullYear()
  const $M = parseDate.getMonth()
  switch (unit) {
    case C.Y:
      return U.parseDate(parseDate.setFullYear($y + number))
    case C.M:
      return U.parseDate(parseDate.setMonth($M + number))
    default:
      return U.parseDate(parseDate.valueOf() + number * (C.MILLISECONDS[unit] || 0))
  }
}

// 减少时间
const subtract = (date, number, units) => add(date, number * -1, units)

const diff = (date1, date2, units) => {
  const parseDate1 = U.parseDate(date1)
  const parseDate2 = U.parseDate(date2)
  const unit = U.prettyUnit(units)
  const difference = parseDate1 - parseDate2
  switch (unit) {
    case C.Y:
      return parseDate1.getFullYear() - parseDate2.getFullYear()
    case C.M:
      return parseDate1.getMonth() - parseDate2.getMonth()
    default:
      return Math.floor(difference / (C.MILLISECONDS[unit] || 1))
  }
}

export const dateUtils = {
  startOf,
  endOf,
  add,
  subtract,
  isSame,
  isAfter,
  isBefore,
  diff,
  format,
  parseDate: U.parseDate
}
