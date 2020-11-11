const { BaseDAO } = require('./BaseDAO')
const UserModel = require('../models/UserModel')

class UserDAO  {
  static get model () {
    return UserModel
  }
  // static query

  static async getByEmail (email) {
    const user = await UserModel.findOne({ email: email });

    // TODO: CATCH ERROR AND SEND 
    return user
  }

  static async getCurrentUser (id) {
    console.log(id);
  }
}

module.exports = { UserDAO }