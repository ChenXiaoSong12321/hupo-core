import { exit } from '@hupo/core-promise'
import { request } from '@hupo/core-request-uni'

class uniToken {
  constructor(options) {
    this.options = options
  }
  async getCode() {
    const [login_error, user] = await uni.login()
    if (login_error) exit(login_error)
    return user.code
  }
  async getToken(code) {
    const [error, token] = await uni.getStorage({ key: token })
    if (error) exit(error)
    if (token.time && this.checkToken(token.time)) {
      return token.token
    } else {
      this.refreshToken()
    }
  }
  async refreshToken() {
    const code = await this.getCode()
    const params_data = {
      code
    }
    const config = {}

    if (this.options.type.toUpperCase() === 'GET') {
      config.params = params_data
    } else {
      // post放在data上
      config.data = params_data
    }
    const res = await request.send({ options: this.options, ...config })
    await uni.setStorage({
      key: 'token',
      data: { token: res.access_token, time: res.expires_in }
    })
  }
  checkToken(time) {
    const now = new Date().getTime()
    const old = new Date(time).getTime()
    // 还有5分钟过期 刷新token
    return now - old < 5 * 60 * 1000
  }
}

export default uniToken
