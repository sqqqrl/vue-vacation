const { UserDAO } = require('../../../dao/UserDAO')
const { checkPassword } = require('../../../rootcommon/checkPassword')
const { makeAccessToken } = require('../common/makeAccessToken')
const { BaseAction } = require('../../../rootcommon/BaseAction')

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

    try {
      user = await UserDAO.getByEmail(ctx.body.email);
      await checkPassword(ctx.body.password, user.password);
    } catch (error) {
      console.log(error);
    }
    return this.result({
      data: {
        accessToken: await makeAccessToken(user)
      }
    })
  }
}

module.exports = { LoginAction }