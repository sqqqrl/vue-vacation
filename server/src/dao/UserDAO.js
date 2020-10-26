// const { BaseDAO } = require('./BaseDAO')
const UserModel = require('../models/user.model')

class UserDAO {
  static get tableName () {
    return 'users'
  }
  // static query

  static async getByEmail (email) {
    // assert.validate(email, UserModel.schema.email, { required: true })
    const user = await UserModel.findOne({ email: email });
    
    return user
  }
}

module.exports = { UserDAO }