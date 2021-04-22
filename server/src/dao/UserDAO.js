const { BaseDAO, assert } = require('server-core')
const UserModel = require('../models/UserModel')

class UserDAO extends BaseDAO {
  static get model () {
    return UserModel
  }

  static async getByEmail (email) {
    const data = await UserModel.findOne({ email: email })
    
    if (!data) throw this.errorEmptyResponse()

    return data
  }

  static async getCurrentUser (id) {
    let data = (await UserModel.findById(id)).toObject()

    if (!data) throw this.errorEmptyResponse()
    // delete sensitive data from current user
    delete data.password;
    
    return data
  }

  static async checkEmailAvailability (email) {
    const data = await UserModel.findOne({ email: email })
    return { available: !data }
  }
}

module.exports = { UserDAO }