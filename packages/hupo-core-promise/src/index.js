import { global } from '@hupo/core-global'
if (!global.promise) global.promise = {}
const isRegExp = reg => Object.prototype.toString.call(reg) === '[object RegExp]'
const createError = data => {
  if (typeof data === 'string') {
    return new Error(data)
  } else if (data instanceof Error) {
    return data
  } else {
    const message = data.message || data.msg || 'reject'
    const error = new Error(message)
    Object.keys(data).forEach(key => {
      if (key !== 'message') {
        error[key] = data[key]
      }
    })
    return error
  }
}
const exit = data => {
  const error = createError(data)
  return Promise.reject(error)
}
const cache = async(id, promise) => {
  if (!global.promise[id]) {
    global.promise[id] = promise()
  }
  try {
    return await global.promise[id]
  } catch (error) {
    global.promise[id] = null
    delete global.promise[id]
    return exit(error)
  }
}
const del = id => {
  // 正则匹配
  if (isRegExp(id)) {
    Object.keys(global.promise).forEach(key => {
      if (id.test(key)) {
        global.promise[key] = null
        delete global.promise[key]
      }
    })
  } else if (global.promise[id]) {
    global.promise[id] = null
    delete global.promise[id]
  }
}
const delay = time => new Promise(resolve => {
  setTimeout(resolve, time)
})
export const promise = {
  createError,
  exit,
  cache,
  del,
  delay
}
