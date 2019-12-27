const UserModel = require("../models/user.model");
const SimpleCrudRoute = require("./simplecrud.route");
const mongoose = require("mongoose");
const {
  encryptText,
  validateRequest,
  validatePermission,
  REQUIRED_PERMISSION_ROLEID
} = require("../components/security");

// overiders GET operation
const fnGet = [
  validateRequest,
  validatePermission(REQUIRED_PERMISSION_ROLEID),
  async function(req, res, next) {
    try {
      const items = await UserModel.find({}, { password: 0 }).exec();
      res.json(items);
    } catch (error) {
      res.status(500).send(error);
    }
  }
];

const fnGetById = [
  validateRequest,
  validatePermission(REQUIRED_PERMISSION_ROLEID),
  async function(req, res, next) {
    try {
      const _id = new mongoose.Types.ObjectId(req.params.id);
      const item = await UserModel.findById({ _id }, { password: 0 }).exec();
      res.send(item);
    } catch (error) {
      res.status(500).send(error);
    }
  }
];

// overides POST operation
const fnPost = [
  async function(req, res, next) {
    try {
      let user = new UserModel(req.body);
      user.password = encryptText(user.password);

      if (!user.roles || user.roles.length === 0) {
        user.roles = [2];
      }
      const result = await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
];

const fnPut = [
  async function(req, res, next) {
    try {
      const _id = new mongoose.Types.ObjectId(req.params.id);
      const user = await UserModel.findById({ _id }).exec();
      user.set(req.body);
      user.password = encryptText(user.password);

      if (!user.roles || user.roles.length === 0) {
        user.roles = [2];
      }
      const result = await user.save();
      res.json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
];

module.exports = SimpleCrudRoute(
  UserModel,
  "",
  fnGet,
  fnGetById,
  fnPost,
  fnPut
);
