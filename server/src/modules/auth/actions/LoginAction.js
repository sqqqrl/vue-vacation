const ms = require('ms')

const { UserDAO } = require('../../../dao/UserDAO')
const { checkPassword } = require('../../../rootcommon/checkPassword')
const { makeAccessToken } = require('../common/makeAccessToken')
const { BaseAction } = require('../../../rootcommon/BaseAction')
const { RefreshSessionEntity } = require('../common/RefreshSessionEntity')
const config = require('../../../config')

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
    } catch (error) {
      throw new Error({ description: 'Invalid credentials', status: 403, code: 'INVALID_CREDENTIALS_ERROR' })
    }

    const newRefreshSession = new RefreshSessionEntity({
      userId: user.id,
      ip: ctx.ip,
      ua: ctx.headers['User-Agent'],
      fingerprint: ctx.body.fingerprint,
      expiresIn: refTokenExpiresInMilliseconds
    })

    return this.result({
      data: {
        accessToken: await makeAccessToken(user),
        refreshToken: newRefreshSession.refreshToken
      },
      cookies: []
    })
  }
}

module.exports = { LoginAction }