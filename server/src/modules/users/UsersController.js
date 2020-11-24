const router = require('express').Router();

const { BaseController } = require('../../rootcommon/BaseController');
const actions = require('./actions')

class UsersController extends BaseController {
  get router () {
    router.get('/users/current', this.actionRunner(actions.GetCurrentUserAction))

    return router
  }

  
  async init () {
    this.logger.debug(`${this.constructor.name} initialized...`)
  }
}

module.exports = { UsersController }