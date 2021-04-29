
const { CompanyDAO } = require('../../../dao/CompanyDAO')
const { BaseAction } = require('../../../rootcommon/BaseAction')
// const { AppError, errorCodes } = require('../../../validator')

class CreateCompanyAction extends BaseAction {
  static async run (ctx) {

    const company = await CompanyDAO.baseCreate({
      ...ctx.body
    })

    return this.result({ data: company })
  }
}

module.exports = { CreateCompanyAction }