const mongoose = require("mongoose");

const PositionModel = mongoose.model(
  "Position",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  })
);

module.exports = PositionModel;
