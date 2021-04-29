const router = require('express').Router();

const { BaseController } = require('../../rootcommon/BaseController');
const actions = require('./actions')

class DepartmentController extends BaseController {
  get router () {
    router.post('/department/create', this.actionRunner(actions.CreateDepartmentAction))

    return router
  }
  
  async init () {
    this.logger.debug(`${this.constructor.name} initialized...`)
  }
}

module.exports = { DepartmentController }