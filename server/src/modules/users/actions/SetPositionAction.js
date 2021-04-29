const { UserDAO } = require('../../../dao/UserDAO')
const { PositionDAO } = require('../../../dao/PositionDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')

class SetPositionAction extends BaseAction {
  static async run (ctx) {
    const { userId, position } = ctx.body

    const positionObject = await PositionDAO.getPosition(position)

    const data = await UserDAO.baseUpdate(userId, {
      position: positionObject
    })
    
    return this.result({ data })
  }
}

module.exports = { SetPositionAction }