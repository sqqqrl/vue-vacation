const mongoose = require("mongoose");

const CompanyModel = mongoose.model(
  "Company",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  })
);

module.exports = CompanyModel;
