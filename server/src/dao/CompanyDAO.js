const { BaseDAO } = require('./BaseDAO')
const CompanyModel = require('../models/CompanyModel')

class CompanyDAO extends BaseDAO {
  static get model () {
    return CompanyModel
  }

  static async getCompany (id) {
    let data = await CompanyModel.findById(id)

    if (!data) throw this.errorEmptyResponse()
    
    return data
  }
}

module.exports = { CompanyDAO }