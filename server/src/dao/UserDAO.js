const { BaseDAO } = require('./BaseDAO')
const UserModel = require('../models/UserModel')

class UserDAO extends BaseDAO {
  static async getByEmail (email) {
    const data = await UserModel.findOne({ email: email });
    if (!data) throw this.errorEmptyResponse();

    return data;
  }

  static async getCurrentUser (id) {
    let data = (await UserModel.findById(id)).toObject();

    if (!data) throw this.errorEmptyResponse();
    // delete sensitive data from current user
    delete data.password;
    
    return data;
  }
}

module.exports = { UserDAO }