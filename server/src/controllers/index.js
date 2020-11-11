const { AuthController } = require('../modules/auth/AuthController')
const { UsersController } = require('../modules/users/UsersController')

module.exports = [
  AuthController,
  UsersController
]
