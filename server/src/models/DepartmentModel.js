const mongoose = require("mongoose");

const DepartmentModel = mongoose.model(
  "Department",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    team_lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
        required: true
      }
    ]
  })
);

module.exports = DepartmentModel;
