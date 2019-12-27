const RewardModel = require("../models/reward.model");
const SimpleCrudRoute = require("./simplecrud.route");

module.exports = SimpleCrudRoute(RewardModel, "");