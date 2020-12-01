
const { UserDAO } = require('../../../dao/UserDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')
const { makePasswordHash } = require('../common/makePasswordHash')
const { AppError, errorCodes } = require('../../../validator')

class CreateUserAction extends BaseAction {
  static async run (ctx) {

    const { available } = await UserDAO.checkEmailAvailability(ctx.body.email);
    if (!available) {
      throw new AppError({ ...errorCodes.EMAIL_ALREADY_TAKEN })
    }

    const hash = await makePasswordHash(ctx.body.password)
    delete ctx.body.password

    const user = await UserDAO.baseCreate({
      ...ctx.body,
      password: hash
    })

    return this.result({ data: user })
  }
}

module.exports = { CreateUserAction }