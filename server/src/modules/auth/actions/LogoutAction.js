const { AppError, errorCodes } = require('server-core')

const { BaseAction } = require('../../../rootcommon/BaseAction')
const { RefreshSessionDAO } = require('../../../dao/RefreshSessionDAO')

/**
 * remove current session
 */
class LogoutAction extends BaseAction {
  // static get accessTag () {
  //   return 'auth:logout'
  // }

  static async run (ctx) {
    // take refresh token from any possible source
    const refreshToken = ctx.cookies.refreshToken || ctx.body.refreshToken
    if (!refreshToken) {
      throw new AppError({ ...errorCodes.VALIDATION, message: 'Refresh token not provided' })
    }

    await RefreshSessionDAO.baseRemoveWhere({ refreshToken })

    return this.result({ message: 'User is logged out from current session.' })
  }
}

module.exports = { LogoutAction }
