
const { DepartmentDAO } = require('../../../dao/DepartmentDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')
// const { AppError, errorCodes } = require('../../../validator')

class CreateDepartmentAction extends BaseAction {
  static async run (ctx) {

    const department = await DepartmentDAO.create({
      ...ctx.body
    })

    return this.result({ data: department })
  }
}

module.exports = { CreateDepartmentAction }