const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    company: String,
    username: String,
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    adress: String,
    phone: Number,
    positionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position"
    }
  })
);

module.exports = User;
