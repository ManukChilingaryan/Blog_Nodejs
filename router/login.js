"use strict";
const express = require("express");
const mongoose = require("mongoose");
const User = require("../Constructors/user");
const { comparePassword } = require("../helperFunctions/hashing");
const { createToken, verifyToken } = require("../helperFunctions/jwtToken");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await comparePassword(password, user.password))) {
    const token = createToken({
      email: email,
      userId: user._id,
      isAuthorized: true,
    });
    res.send({ access_token: token });
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

module.exports = router;
