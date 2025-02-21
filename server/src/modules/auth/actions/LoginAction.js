const ms = require('ms')

const { AppError, errorCodes, CookieEntity } = require('server-core')
const { UserDAO } = require('../../../dao/UserDAO')
const { checkPassword } = require('../../../rootcommon/checkPassword')
const { makeAccessToken } = require('../common/makeAccessToken')
const { BaseAction } = require('../../../rootcommon/BaseAction')
const { RefreshSessionEntity } = require('../common/RefreshSessionEntity')
const { addRefreshSession } = require('../common/addRefreshSession')
const config = require('../../../config')
// const { lchown } = require('fs')

class LoginAction extends BaseAction {
  static get accessTag () {
    return 'auth:login'
  }

  // TODO: VALIDATION

  // static get validationRules () {
  //   return {
  //     body: {
  //       password: new RequestRule(AuthModel.schema.password, { required: true }),
  //       email: new RequestRule(AuthModel.schema.email, { required: true }),
  //       fingerprint: new RequestRule(AuthModel.schema.fingerprint, { required: true })
  //     }
  //   }
  // }

  static async run (ctx) {
    let user = {}
    const refTokenExpiresInMilliseconds = new Date().getTime() + ms(config.token.refresh.expiresIn)
    const refTokenExpiresInSeconds = parseInt(refTokenExpiresInMilliseconds / 1000)

    try {
      user = await UserDAO.getByEmail(ctx.body.email);
      await checkPassword(ctx.body.password, user.password);
    } catch (e) {
      if ([errorCodes.NOT_FOUND.code, errorCodes.INVALID_PASSWORD.code].includes(e.code)) {
        return new AppError({ ...errorCodes.INVALID_CREDENTIALS })
      }
      return e
    }

    const newRefreshSession = new RefreshSessionEntity({
      userId: user.id,
      ip: ctx.ip,
      ua: ctx.headers['User-Agent'],
      fingerprint: ctx.body.fingerprint,
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

module.exports = { LoginAction }