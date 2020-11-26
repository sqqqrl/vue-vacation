const ms = require('ms')
const { AppError, errorCodes } = require('../../../validator')

const { BaseAction } = require('../../../rootcommon/BaseAction')
const { addRefreshSession } = require('../common/addRefreshSession')
const { makeAccessToken } = require('../common/makeAccessToken')
const { verifyRefreshSession } = require('../common/verifyRefreshSession')
const { RefreshSessionEntity } = require('../common/RefreshSessionEntity')
const { UserDAO } = require('../../../dao/UserDAO')
const { RefreshSessionDAO } = require('../../../dao/RefreshSessionDAO')
const { CookieEntity } = require('../../../core')
const config = require('../../../config')

class RefreshTokensAction extends BaseAction {
  static get accessTag () {
    return 'auth:refresh-tokens'
  }

  static async run (ctx) {
    // take refresh token from any possible source
    const reqRefreshToken = ctx.cookies.refreshToken || ctx.body.refreshToken
    const reqFingerprint = ctx.body.fingerprint

    if (!reqRefreshToken) {
      throw new AppError({ ...errorCodes.VALIDATION, message: 'Refresh token not provided' })
    }

    const refTokenExpiresInMilliseconds = new Date().getTime() + ms(config.token.refresh.expiresIn)
    const refTokenExpiresInSeconds = parseInt(refTokenExpiresInMilliseconds / 1000)
    const oldRefreshSession = await RefreshSessionDAO.getByRefreshToken(reqRefreshToken)
    await RefreshSessionDAO.baseRemoveWhere({ refreshToken: reqRefreshToken })
    await verifyRefreshSession(new RefreshSessionEntity(oldRefreshSession), reqFingerprint)
    const user = await UserDAO.baseGetById(oldRefreshSession.userId)



    const newRefreshSession = new RefreshSessionEntity({
      userId: user.id,
      ip: ctx.ip,
      ua: ctx.headers['User-Agent'],
      fingerprint: reqFingerprint,
      expiresIn: refTokenExpiresInMilliseconds
    })

    await addRefreshSession(newRefreshSession)

    return this.result({
      data: {
        accessToken: await makeAccessToken(user),
        refreshToken: newRefreshSession.refreshToken
      },
      cookies: [
        new CookieEntity({
          name: 'refreshToken',
          value: newRefreshSession.refreshToken,
          domain: 'localhost',
          path: '/auth',
          maxAge: refTokenExpiresInSeconds,
          secure: false // temp: should be deleted
        })
      ]
    })
  }
}

module.exports = { RefreshTokensAction }
