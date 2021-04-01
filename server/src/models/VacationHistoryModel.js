const mongoose = require("mongoose");

const VacationHistoryModel = mongoose.model(
  "VacationHistory",
  new mongoose.Schema({
    totalDays: Number,
    timeline: String
  })
);

module.exports = VacationHistoryModel;
