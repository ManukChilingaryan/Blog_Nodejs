"use strict";
const express = require("express");
const router = express.Router();

// user logout 
router.post("/logout", async (req, res) => {
  // after this response in client side we need store  in bearer token
  try {
    res.status(200).send({ access_token: "" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
