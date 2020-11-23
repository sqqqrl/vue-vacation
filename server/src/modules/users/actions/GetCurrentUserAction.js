
const { UserDAO } = require('../../../dao/UserDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')

class GetCurrentUserAction extends BaseAction {
  static async run (ctx) {
    const { currentUser } = ctx
    try {
      const data = await UserDAO.getCurrentUser(currentUser.id);

      return this.result({ data })
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { GetCurrentUserAction }