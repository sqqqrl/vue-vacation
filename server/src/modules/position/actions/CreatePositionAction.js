
const { PositionDAO } = require('../../../dao/PositionDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')
// const { AppError, errorCodes } = require('../../../validator')

class CreatePositionAction extends BaseAction {
  static async run (ctx) {

    const user = await PositionDAO.baseCreate({
      ...ctx.body
    })

    return this.result({ data: user })
  }
}

module.exports = { CreatePositionAction }