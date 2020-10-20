const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/users.controller");

module.exports = function(app) {
  app.post(
    "/api/users/getAllUsers",
    [
      authJwt.isAdmin
    ],
    controller.getUsers
  )
}