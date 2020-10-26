const { UserDAO } = require('../../../dao/UserDAO')
const { checkPassword } = require('../../../rootcommon/checkPassword')

class LoginAction {
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
    return user;
  }
}

module.exports = { LoginAction }