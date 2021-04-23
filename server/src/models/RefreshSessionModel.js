const mongoose = require("mongoose");
const isUUID = require('validator/lib/isUUID')

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  refreshToken: {
    type: String,
    validate: {
      validator: (v) => isUUID(v)
    },
    required: true
  },
  fingerprint: {
    type: String,
    maxlength: 200,
    required: true
  },
  ua: String,
  ip: String,
  expiresIn: {
    type: Number,
    required: true
  }
})

const RefreshSessionModel = mongoose.model("refresh_session", schema);

module.exports = RefreshSessionModel;