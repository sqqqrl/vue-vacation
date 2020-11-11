import axios from 'axios'

import $store from '../store'
import $router from '../router'

import { API_URL } from '../.env.js'

let BEARER = ''

export class AuthService {
  static async makeLogin ({ email, password }) {
    try {
      const response = await axios
        .post(
          `${API_URL}/auth/login`,
          { email, password },
          // { withCredentials: true }
        )
      _setAuthData({
        accessToken: response.data.data.accessToken,
        exp: _parseTokenData(response.data.data.accessToken).exp
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  static setRefreshToken (status) {
    if (!['', 'true'].includes(status)) {
      throw new Error(`setRefreshToken: invalid value ${status}; Expect one of ['', 'true']`)
    }

    localStorage.setItem('refreshToken', status)
  }

  static hasRefreshToken () {
    return Boolean(localStorage.getItem('refreshToken'))
  }

  static isAccessTokenExpired () {
    const accessTokenExpDate = $store.state.auth.accessTokenExpDate - 10
    const nowTime = Math.floor(new Date().getTime() / 1000)

    return accessTokenExpDate <= nowTime
  }

  static setBearer (accessToken) {
    BEARER = `Bearer ${accessToken}`
  }

  static debounceRefreshTokens = this._debounce(() => {
    return this.refreshTokens()
  }, 100)

  static async refreshTokens () {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh-tokens`, {
        fingerprint: await _getFingerprint()
      }, { withCredentials: true })

      _setAuthData({
        accessToken: response.data.data.accessToken,
        exp: _parseTokenData(response.data.data.accessToken).exp
      })
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      _resetAuthData()
      $router.push({ name: 'login' }).catch(() => {})
      throw new ErrorWrapper(error)
    }
  }

  static _debounce (inner, ms = 0) {
    let timer = null
    let resolves = []

    return function () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const result = inner()
        resolves.forEach(r => r(result))
        resolves = []
      }, ms)

      return new Promise(resolve => resolves.push(resolve))
    }
  }

  static getBearer () {
    return BEARER
  }
}

function _setAuthData ({ accessToken, exp } = {}) {
  AuthService.setRefreshToken('true')
  AuthService.setBearer(accessToken)
  $store.commit('auth/SET_ATOKEN_EXP_DATE', exp)
}

function _parseTokenData (accessToken) {
  let payload = ''
  let tokenData = {}

  try {
    payload = accessToken.split('.')[1]
    tokenData = JSON.parse(atob(payload))
  } catch (error) {
    throw new Error(error)
  }
  return tokenData
}