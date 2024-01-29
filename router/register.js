"use strict";
const express = require("express");
const User = require("../Constructors/user");
const { hashPassword } = require("../helperFunctions/hashing");
const { verifyToken, decodeToken } = require("../helperFunctions/jwtToken");
const router = express.Router();

// create new user
router.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send(newUser);
    console.log("created another one");
  } catch (error) {
    console.log("error from register post", error);
    res.status(400).send(error);
  }
});

// get user information
router.get("/register", async (req, res) => {
  try {
    const users = await User.find(req.query);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update user account
router.put("/register", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const isAuthorized = await verifyToken(token);

    if (isAuthorized) {
      const { userId } = decodeToken(token);
      const hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      const user = await User.findByIdAndUpdate(userId, req.body);
      res.status(201).send(user);
    } else {
      res.status(401).send("You are not authorized");
    }
  } catch (err) {
    res.status(400).send("error: email already exist");
  }
});

// delete user account
router.delete("/register", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const isAuthorized = await verifyToken(token);

    if (isAuthorized) {
      const { userId } = decodeToken(token);
      const user = await User.findByIdAndDelete(userId);
      res.status(200).send(user);
    } else {
      res.status(401).send("You are not authorized");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
