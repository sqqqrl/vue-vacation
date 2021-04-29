const { BaseDAO } = require('server-core')
const DepartmentModel = require('../models/DepartmentModel')
const { assert } = require('server-core')

class DepartmentDAO extends BaseDAO {
  static get model () {
    return DepartmentModel
  }

  static create (data) {
    assert.object(data, { required: true })

    return this
      .createModel(data)
      .save()
  }
}

module.exports = { DepartmentDAO }