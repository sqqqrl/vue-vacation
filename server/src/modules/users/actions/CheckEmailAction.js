
const { UserDAO } = require('../../../dao/UserDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')

class CheckEmailAction extends BaseAction {
  static async run (ctx) {
    const { email } = ctx.body;
    const data = await UserDAO.checkEmailAvailability(email);
    
    return this.result({ data })
  }
}

module.exports = { CheckEmailAction }