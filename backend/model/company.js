const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    company_name: { type: String,},
    url: { type: String, },
  }
);
companySchema.index({"$**": 'text'});

module.exports = mongoose.model("companies", companySchema);