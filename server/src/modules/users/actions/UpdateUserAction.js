
const { UserDAO } = require('../../../dao/UserDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')

class UpdateUserAction extends BaseAction {
  static async run (ctx) {
    const { currentUser } = ctx;
    const data = await UserDAO.baseUpdate(currentUser.id, ctx.body);

    return this.result({ success: true, status: 200 })
  }
}

module.exports = { UpdateUserAction }