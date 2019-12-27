const mongoose = require("mongoose");
const baseModelFields = require("./base.model");

const UserSchema = mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  userName: { type: String, require: true, trim: true, lowercase: true },
  password: { type: String, require: false, trim: true },
  roles: { type: Array },
  ...baseModelFields
});

const model = mongoose.model("users", UserSchema);

module.exports = model;
