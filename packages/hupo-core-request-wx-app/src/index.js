import { initialize as baseInitialize, defaultConfig, formatParams, pendding, filterResponse, filterError, complete, getRequestIdentify, removePending } from '@hupo/core-request-base'

// 超时
const CONFIG = defaultConfig()

let base_url = ''

export const request = async _config => {
  if (typeof wx !== 'undefined') {
    return new Promise((resolve, reject) => {
      const { options, data = {}, params = {}, headers = CONFIG.headers, setting = {}} = _config
      let config = {
        method: options.type,
        url: `${base_url}${options.url}`,
        header: headers,
        params,
        data
      }
      config = formatParams(config)
      const request = wx.request({
        ...config,
        ...setting,
        async success(response) {
          try {
            response.config = config
            response.status = response.statusCode
            await filterError(response)
            response = filterResponse(response)
            const data = await complete(response, _config)
            resolve(data)
          } catch (error) {
            const id = getRequestIdentify(config)
            removePending(id)
            reject(error)
          }
        },
        fail(error) {
          const id = getRequestIdentify(config)
          removePending(id)
          reject(error)
        }
      })
      pendding(config, () => request.abort())
    })
  }
}

export const initialize = baseUrl => {
  baseInitialize(baseUrl)
  base_url = baseUrl
}

export default request
