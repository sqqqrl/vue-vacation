const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  company: {
    type: String,
    maxlength: 128
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 128
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },
  firstname: {
    type: String,
    maxlength: 128,
    trim: true
  },
  lastname: {
    type: String,
    maxlength: 128,
    trim: true
  },
  phone: {
    type: Number,
    maxlength: 12,
    trim: true
  }
})

const User = mongoose.model("User", schema);

module.exports = User;