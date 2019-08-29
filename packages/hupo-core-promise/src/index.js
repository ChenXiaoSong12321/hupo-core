import global from '@hupo/core-global'
export const exit = message => Promise.reject(new Error(message))
export const cache = async (id, promise) => {
  if (!global.promise) global.promise = {}
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
export const del = id => {
  if (global.promise[id]) {
    global.promise[id] = null
    delete global.promise[id]
  }
}
export const delay = time => new Promise(resolve => {
  setTimeout(resolve, time)
})
export default {
  exit,
  cache,
  del,
  delay
}