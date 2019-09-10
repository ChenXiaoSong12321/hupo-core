import { initialize as baseInitialize, defaultConfig, formatParams, pendding, filterResponse, filterError, complete } from '@hupo/core-request-base'; // 超时

const CONFIG = defaultConfig();
let base_url = '';
export const request = async _config => {
  if (typeof wx !== 'undefined') {
    return new Promise((resolve, reject) => {
      const {
        options,
        data = {},
        params = {},
        headers = CONFIG.headers
      } = _config;
      let config = {
        method: options.type,
        url: `${base_url}${options.url}`,
        header: headers,
        params,
        data
      };
      config = formatParams(config);
      const request = wx.request({ ...config,

        success(response) {
          response.config = config;
          response.status = response.statusCode;
          filterError(response);
          response = filterResponse(response);
          const data = complete(response, _config);
          resolve(data);
        },

        fail(error) {
          console.error('看看错误数据结构', error);
          reject(error);
        }

      });
      pendding(config, request.abort);
    });
  }
};
export const initialize = baseUrl => {
  baseInitialize(baseUrl);
  base_url = baseUrl;
};
export default request;