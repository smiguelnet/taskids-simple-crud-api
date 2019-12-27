const mongoose = require("mongoose");

const getManageControlFields = () => {
  return {
    active: { type: Boolean, required: true, default: true },
    created: { type: Date, required: true, default: Date.now },
    updated: { type: Date, required: false, default: null }
  };
};

module.exports = getManageControlFields();
