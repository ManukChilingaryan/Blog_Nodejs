"use strict";
const express = require("express");
const router = express.Router();
const Blog = require("../Constructors/blog.js");
const { verifyToken, decodeToken } = require("../helperFunctions/jwtToken");

// Create a new blog post
router.post("/blog", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(req.headers.authorization.split(" ")[1]);
  const verified = await verifyToken(token);

  console.log(verified);
  if (verified) {
    const { userId } = decodeToken(token);
    console.log(userId);
    const newPost = new Blog({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      userId: userId,
    });
    console.log(newPost);
    await newPost.save();
    res.status(201).send(newPost);
  } else {
    res.status(401).send("Invalid or expired token");
  }
});

// Ubdate a blog post
router.put("/blog/:id", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.headers.authorization.split(" ")[1]);
    const verified = verifyToken(token);

    if (verified) {
      const { userId } = decodeToken(token);
      const post = await Blog.findById(req.params.id);
      console.log("userId", userId);
      console.log("post", post);

      if (post && userId === post.userId) {
        const updatedPost = await Blog.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        res.status(201).send(updatedPost);
      } else {
        res.status(403).send("You can't update another author's post.");
      }
    } else {
      res.status(401).send("Invalid or expired token");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//delete a blog post
router.delete("/blog/:id", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isAuthorized = verifyToken(token);

    if (isAuthorized) {
      const { userId } = decodeToken(token);
      const post = await Blog.findById(req.params.id);
      console.log("verified");
      if (post && userId === post.userId) {
        const deletedPost = await Blog.findByIdAndDelete(req.params.id);
        res.status(200).send(deletedPost);
      } else {
        res.status(403).send("You can't delete another author's post.");
      }
    } else {
      res.status(401).send("Invalid or expired token");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
