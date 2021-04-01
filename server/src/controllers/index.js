const { AuthController } = require('../modules/auth/AuthController')
const { UsersController } = require('../modules/users/UsersController')
const { PositionController } = require('../modules/position/PositionController')

module.exports = [
  AuthController,
  UsersController,
  PositionController
]
