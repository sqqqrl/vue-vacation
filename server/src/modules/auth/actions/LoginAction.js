const { UserDAO } = require('../../../dao/UserDAO')

class LoginAction extends BaseAction {
  static get accessTag () {
    return 'auth:login'
  }

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
      user = await UserDAO.getByEmail(ctx.body.email)
    } catch (error) {

    }
  }
}