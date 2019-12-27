const mongoose = require("mongoose");
const baseModelFields = require("./base.model");

const RewardSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: false, trim: true },
  ...baseModelFields
});

const model = mongoose.model("rewards", RewardSchema);

module.exports = model;
