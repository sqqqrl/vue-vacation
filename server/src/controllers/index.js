const { AuthController } = require('../modules/auth/AuthController')
const { UsersController } = require('../modules/users/UsersController')
const { PositionController } = require('../modules/position/PositionController')
const { CompanyController } = require('../modules/company/CompanyController')

module.exports = [
  AuthController,
  UsersController,
  PositionController,
  CompanyController
]
