const mongoose = require("mongoose");

const TakeVacationModel = mongoose.model(
  "take_vacation",
  new mongoose.Schema({
    start_date: Date,
    end_date: Date,
    reason: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    vacationHistoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VacationHistory"
    },
  })
);

module.exports = TakeVacationModel;
