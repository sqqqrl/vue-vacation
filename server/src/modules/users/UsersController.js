const router = require('express').Router();

const { BaseController } = require('../../rootcommon/BaseController');
const actions = require('./actions')

class UsersController extends BaseController {
  get router () {
    router.get('/users/current', this.actionRunner(actions.GetCurrentUserAction))

    router.post('/users/create', this.actionRunner(actions.CreateUserAction))
    router.post('/users/checkEmail', this.actionRunner(actions.CheckEmailAction))

    router.patch('/users', this.actionRunner(actions.UpdateUserAction))
    router.patch('/users/setPosition', this.actionRunner(actions.SetPositionAction))
    return router
  }

  
  async init () {
    this.logger.debug(`${this.constructor.name} initialized...`)
  }
}

module.exports = { UsersController }