const express = require("express");
const mongoose = require("mongoose");
const debug = require("debug")("taskids:simplecrud.route");
const {
  validateRequest,
  validatePermission,
  REQUIRED_PERMISSION_ROLEID
} = require("../components/security");

const SimpleCrudRoute = (
  entityModel,
  entryPoint,
  fnGet = null,
  fnGetById = null,
  fnPost = null,
  fnPut = null,
  fnDelete = null
) => {
  const router = express.Router();

  // GET
  router.get(
    entryPoint,
    fnGet || [
      validateRequest,
      validatePermission(REQUIRED_PERMISSION_ROLEID),
      async function(req, res, next) {
        try {
          const items = await entityModel.find({}).exec();
          res.json(items);
        } catch (error) {
          res.status(500).send(error);
        }
      }
    ]
  );

  // GET BY ID
  router.get(
    `${entryPoint}/:id`,
    fnGetById || [
      validateRequest,
      validatePermission(REQUIRED_PERMISSION_ROLEID),
      async function(req, res, next) {
        try {
          const _id = new mongoose.Types.ObjectId(req.params.id);
          const item = await entityModel.findById({ _id }).exec();
          res.json(item);
        } catch (error) {
          res.status(500).send(error);
        }
      }
    ]
  );

  // POST
  router.post(
    entryPoint,
    fnPost || [
      validateRequest,
      validatePermission(REQUIRED_PERMISSION_ROLEID),
      async function(req, res, next) {
        try {
          const item = new entityModel(req.body);
          const result = await item.save();
          res.json(result);
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      }
    ]
  );

  // PUT
  router.put(
    `${entryPoint}/:id`,
    fnPut || [
      validateRequest,
      validatePermission(REQUIRED_PERMISSION_ROLEID),
      async function(req, res, next) {
        try {
          const _id = new mongoose.Types.ObjectId(req.params.id);
          const item = await entityModel.findById({ _id }).exec();
          item.set(req.body);
          const result = await item.save();
          res.json(result);
        } catch (error) {
          res.status(500).send(error);
        }
      }
    ]
  );

  // DELETE
  router.delete(
    `${entryPoint}/:id`,
    fnDelete || [
      validateRequest,
      validatePermission(REQUIRED_PERMISSION_ROLEID),
      async function(req, res, next) {
        const _id = new mongoose.Types.ObjectId(req.params.id);
        const result = await entityModel.deleteOne({ _id }).exec();
        res.json(result);
      }
    ]
  );

  return router;
};

module.exports = SimpleCrudRoute;
