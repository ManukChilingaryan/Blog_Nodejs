"use strict";
const express = require("express");
const router = express.Router();

// user logout 
router.post("/logout", async (req, res) => {
  // log out handled by using cookies
  try {
    res.clearCookie('access_token');
    res.status(200).send("user logged out");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
