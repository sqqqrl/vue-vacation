const { AuthController } = require('../modules/auth/AuthController')
const { UsersController } = require('../modules/users/UsersController')
const { PositionController } = require('../modules/position/PositionController')
const { DepartmentController } = require('../modules/department/DepartmentController')
const { CompanyController } = require('../modules/company/CompanyController')

module.exports = [
  AuthController,
  UsersController,
  PositionController,
  DepartmentController,
  CompanyController
]
