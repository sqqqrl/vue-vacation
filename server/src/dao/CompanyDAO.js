const { BaseDAO } = require('server-core')
const CompanyModel = require('../models/CompanyModel')

class CompanyDAO extends BaseDAO {
  static get model () {
    return CompanyModel
  }
}

module.exports = { CompanyDAO }