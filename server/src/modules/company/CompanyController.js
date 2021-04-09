const router = require('express').Router();

const { BaseController } = require('../../rootcommon/BaseController');
const actions = require('./actions')

class CompanyController extends BaseController {
  get router () {
    router.post('/company/create', this.actionRunner(actions.CreateCompanyAction))

    return router
  }
  
  async init () {
    this.logger.debug(`${this.constructor.name} initialized...`)
  }
}

module.exports = { CompanyController }