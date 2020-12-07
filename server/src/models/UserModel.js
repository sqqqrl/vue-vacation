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
    phone: Number
  })
);

module.exports = User;
