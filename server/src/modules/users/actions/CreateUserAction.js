
const { UserDAO } = require('../../../dao/UserDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')
const { makePasswordHash } = require('../common/makePasswordHash')

class CreateUserAction extends BaseAction {
  static async run (ctx) {
    const hash = await makePasswordHash(ctx.body.password)
    delete ctx.body.password

    const user = await UserDAO.baseCreate({
        ...ctx.body,
        password: hash
    })

    console.log(user);
    // return this.result({ data })
  }
}

module.exports = { CreateUserAction }