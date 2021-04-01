const router = require('express').Router();

const { BaseController } = require('../../rootcommon/BaseController');
const actions = require('./actions')

class PositionController extends BaseController {
  get router () {
    router.post('/position/create', this.actionRunner(actions.CreatePositionAction))

    return router
  }
  
  async init () {
    this.logger.debug(`${this.constructor.name} initialized...`)
  }
}

module.exports = { PositionController }