const mongoose = require("mongoose");

const RefreshSessionModel = mongoose.model(
  "refresh_session",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    refreshToken: String,
    ua: String,
    ip: String,
    expiresIn: Number
  })
);

module.exports = RefreshSessionModel;