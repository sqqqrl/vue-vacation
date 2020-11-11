const { BaseDAO } = require('./BaseDAO')
const RefreshSessionModel = require('../models/RefreshSessionModel')

class RefreshSessionDAO extends BaseDAO {
  static get model () {
    return RefreshSessionModel
  }

  static async getByRefreshToken (refreshToken) {
    const result = await RefreshSessionModel.findOne({ refreshToken: refreshToken })
    console.log(result);
    // return result
  }
}

module.exports = { RefreshSessionDAO }
