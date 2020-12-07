const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    company: String,
    phone: Number,
    adress: String
  })
);

module.exports = User;
