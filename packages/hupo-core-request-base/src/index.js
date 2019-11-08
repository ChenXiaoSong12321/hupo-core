import global from '@hupo/core-global'
import { addUrlParam } from '@hupo/core-url'
import { createError } from '@hupo/core-promise'
global.__request_pending__ = {}

export const initialize = baseUrl => {
  console.log('baseURL', baseUrl)
  global.__base_url__ = baseUrl
}

// 默认配置
export const defaultConfig = () => {
  return {
    withCredentials: false, // send cookies when cross-domain requests
    timeout: 15000, // request timeout
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
  }
}
// 格式化get 参数
export const formatParams = config => {
  const params = {}
  Object.keys(config.params).forEach(key => {
    const type = Object.prototype.toString.call(config.params[key])
    if (type.includes('Array')) {
      config.params[key] = config.params[key].join(',')
    }
    params[key] = encodeURIComponent(type.includes('Object') ? JSON.stringify(config.params[key]) : config.params[key])
  })
  config.url = addUrlParam(params, config.url)
  delete config.params
  return config
}

// 获取请求唯一id// 获取请求唯一id
export const getRequestIdentify = config => {
  config.url = config.url.replace(config.baseURL, '')
  config.data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
  return encodeURIComponent(JSON.stringify({
    url: config.url,
    data: config.data,
    method: config.method
  }))
}

// 缓存正在请求的接口
export const pendding = (config, abort) => {
  const id = getRequestIdentify(config)
  removePending(id, true)
  global.__request_pending__[id] = abort
}

// 结束正在请求的接口
export const removePending = (key, isRequest = false) => {
  if (global.__request_pending__[key] && isRequest) {
    global.__request_pending__[key]('abort')
  }
  delete global.__request_pending__[key]
}

// 请求完成处理
export const filterResponse = response => {
  console.groupCollapsed(`%cresponse debug: %c${response.config.url}`, 'color: #999', 'color: #0076ff')
  console.log(response.config)
  console.log(response.data)
  console.groupEnd()
  const id = getRequestIdentify(response.config)
  removePending(id)
  return response
}

// 通用异常处理
export const filterError = response => new Promise((resolve, reject) => {
  let message = ''
  switch (response.status) {
    case 400: message = '请求错误'; break
    case 401:
      message = '未授权，请登录'
      break
    case 403: message = '拒绝访问'; break
    case 404: message = `请求地址出错: ${response.config.url}`; break
    case 408: message = '请求超时'; break
    case 500: message = '服务器内部错误'; break
    case 501: message = '服务未实现'; break
    case 502: message = '网关错误'; break
    case 503: message = '服务不可用'; break
    case 504: message = '网关超时'; break
    case 505: message = 'HTTP版本不受支持'; break
    default: break
  }
  if (response.status !== 200 && !message) {
    message = '系统繁忙，请稍后再试'
  }
  if (message) {
    reject(createError({
      message,
      response
    }))
  } else {
    resolve()
  }
})

export const complete = (response, config) => new Promise((resolve, reject) => {
  const { data = {}} = response
  const { code } = data

  if (code === undefined) {
    // 如果没有 code 代表这不是业务接口 比如获取配置
    resolve(data)
  } else {
    // 有 code 代表这是一个后端接口 可以进行进一步的判断
    switch (code) {
      case 0:
      // [ 示例 ] code === 0 代表没有错误
        resolve(data.data)
        break
      case -1: {
        const error = {
          message: '系统错误',
          info: `${data.msg}: ${config.options.url}`,
          data: response
        }
        reject(createError(error))
        break
      }
      default: {
        const defaultError = {
          message: data.msg,
          info: `${data.msg}: ${config.options.url}`,
          data: response
        }
        reject(createError(defaultError))
        break
      }
    }
  }
})
