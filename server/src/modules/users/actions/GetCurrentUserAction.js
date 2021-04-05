
const { UserDAO } = require('../../../dao/UserDAO')
const { PositionDAO } = require('../../../dao/PositionDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')

class GetCurrentUserAction extends BaseAction {
  static async run (ctx) {
    const { currentUser } = ctx;
    const data = await UserDAO.getCurrentUser(currentUser.id);
    
    return this.result({ data })
  }
}

module.exports = { GetCurrentUserAction }