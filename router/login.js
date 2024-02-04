"use strict";
const express = require("express");
const mongoose = require("mongoose");
const User = require("../Constructors/user");
const { comparePassword } = require("../helperFunctions/hashing");
const { createToken, verifyToken } = require("../helperFunctions/jwtToken");
const router = express.Router();

// user login 
// here creates new jwt token and sends it to the client
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await comparePassword(password, user.password))) {
    const token = createToken({
      email: email,
      userId: user._id,
      isAuthorized: true,
    });
    const maxAge = 24*60*60*1000;
    res.cookie('access_token', token, {maxAge: maxAge,}).send('cookiess are puted into the cookie');
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

module.exports = router;
