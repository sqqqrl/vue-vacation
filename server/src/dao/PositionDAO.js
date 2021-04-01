const { BaseDAO } = require('./BaseDAO')
const PositionModel = require('../models/PositionModel')

class PositionDAO extends BaseDAO {
  static get model () {
    return PositionModel
  }

  // static async getByName (name) {
  //   const data = await PositionModel.findOne({ name: name })
    
  //   if (!data) throw this.errorEmptyResponse()

  //   return data
  // }
}

module.exports = { PositionDAO }