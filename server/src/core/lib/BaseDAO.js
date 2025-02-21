const errorCodes = require('./errorCodes')
const { AppError } = require('./AppError')
const { Assert: assert } = require('./assert')

class BaseDAO {
  static errorEmptyResponse () {
    return new AppError({ ...errorCodes.NOT_FOUND, layer: 'DAO' })
  }

  static clearSensativeData (data) {
    const result = {...data}._doc

    delete result.password

    return result
  }

  static createModel (entity) {
    return new this.model({...entity})
  }

  static baseCreate (entity = {}) {
    assert.object(entity, { required: true })

    return this
      .createModel(entity)
      .save()
      .then(doc => this.clearSensativeData(doc))
  }

  static baseUpdate (id, entity = {}) {
    assert.id(id, { required: true })
    assert.object(entity, { required: true })

    return this.model
      .findByIdAndUpdate({ _id: id }, entity)
  }

  static async baseGetCount (filter = {}) {
    assert.object(filter, { required: true })

    const result = await this.model.countDocuments(filter)
    return result
  }

  static async baseRemoveWhere (where) {
    return this.model.deleteOne(where)
  }

  static async baseGetById (id) {
    assert.id(id, { required: true })

    const result = await this.model.findById(id)
    return result
  }
}

module.exports = { BaseDAO }


