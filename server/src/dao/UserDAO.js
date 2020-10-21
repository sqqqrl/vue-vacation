const { BaseDAO } = require('./BaseDAO')
const { UserModel } = require('../models/UserModel')

class UserDAO extends BaseDAO {
  static get tableName () {
    return 'users'
  }
  // static query

  static async getByEmail (email) {
    // assert.validate(email, UserModel.schema.email, { required: true })
    UserModel.findOne({
      email: req.body.email
    })

    const data = await this.query().where({ email }).first()
    if (!data) throw this.errorEmptyResponse()
    return data
  }
}

module.exports = { UserDAO }