import axios from 'axios'

import $store from '../store'
import $router from '../router'

import { API_URL } from '../.env.js'

export class  AuthService {
  static async makeLogin ({ email, password }) {
    try {
      const response = await axios
        .post(
          `${API_URL}/auth/login`,
          { email, password },
          { withCredentials: true }
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

  static setBearer (accessToken) {
    BEARER = `Bearer ${accessToken}`
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