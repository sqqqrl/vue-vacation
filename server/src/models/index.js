const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./UserModel");
db.role = require("./role.model");
db.refresh_session = require("./RefreshSessionModel")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;