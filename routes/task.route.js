const TaskModel = require("../models/task.model");
const SimpleCrudRoute = require("./simplecrud.route");

module.exports = SimpleCrudRoute(TaskModel, "");