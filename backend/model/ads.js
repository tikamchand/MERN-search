// userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdsSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "companies",
  },
  primaryText: { type: String },
  headline: { type: String },
  description: { type: String },
  cta: { type: String },
  imageUrl: { type: String },
});
AdsSchema.index({"$**": 'text'});

module.exports = mongoose.model("ads", AdsSchema);
