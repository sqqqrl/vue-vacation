
const { UserDAO } = require('../../../dao/UserDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')

class GetCurrentUserAction extends BaseAction {
  static async run (ctx) {
    const { currentUser } = ServiceUIFrameContext
    try {
      const res = await UserDAO.getCurrentUser(ctx);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { GetCurrentUserAction }