const { AppError, errorCodes } = require('../validator')

class BaseDAO {
  static createModel (entity) {
    return new this.model({...entity})
  }

  static async baseCreate (entity = {}) {
    console.log(this.createModel(entity));
    return this.createModel(entity).save(err => {
      console.log(err);
    })
  }

  static async baseGetCount (filter = {}) {
    const result = await this.model.countDocuments(filter)
    return result
  }

  static async baseRemoveWhere (where = {}) {
    return this.model.deleteMany(where)
  }
}

module.exports = { BaseDAO }


