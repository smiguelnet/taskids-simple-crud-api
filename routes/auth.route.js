const express = require("express");
const UserModel = require("../models/user.model");
const { encryptText, generateToken } = require("../components/security");
const mongoose = require("mongoose");

const router = express.Router();

router.post("", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    //invalid request
    if (!userName || !password) {
      return res.status(400).json({ status: "invalid request" });
    }
    const user = await UserModel.findOne({ userName })
      .limit(1)
      .exec();

    //user not found
    if (!user) {
      return res.status(400).json({ status: "user not found" });
    }

    //check password
    const passwordRepo = user.password;
    const passwordParam = encryptText(password);

    if (passwordRepo !== passwordParam) {
      return res.status(400).json({ status: "invalid credentials" });
    }

    //generate token
    const token = generateToken(user);

    res.json({ status: "user logged", token, user });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
