const mongoose = require("mongoose");
const baseModelFields = require("./base.model");

const TaskSchema = mongoose.Schema({
  name: { type: String, require: true, trim: true },
  description: { type: String, require: false, trim: true },
  ...baseModelFields
});

const model = mongoose.model("tasks", TaskSchema);

module.exports = model;
