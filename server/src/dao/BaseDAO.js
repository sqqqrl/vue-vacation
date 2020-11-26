const { AppError, errorCodes } = require('../validator')

class BaseDAO {
  static errorEmptyResponse () {
    return new AppError({ ...errorCodes.NOT_FOUND, layer: 'DAO' })
  }

  static createModel (entity) {
    return new this.model({...entity})
  }

  static async baseCreate (entity = {}) {
    return this.createModel(entity).save(err => {
      console.log(err);
    })
  }

  static async baseGetCount (filter = {}) {
    const result = await this.model.countDocuments(filter)
    return result
  }

  static async baseRemoveWhere (where) {
    return this.model.deleteOne(where)
  }

  static async baseGetById (id) {
    const result = await this.model.findById(id)
    return result
  }
}

module.exports = { BaseDAO }


