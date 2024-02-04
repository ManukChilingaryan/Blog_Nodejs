"use strict";
const express = require("express");
const router = express.Router();
const Comment = require("../Constructors/comment");
const { verifyToken, decodeToken } = require("../helperFunctions/jwtToken");

// create new comment when given blog id
router.post("/comment/:id", async (req, res) => {
  try {
    const token = req.cookies.access_token;
    const isAuthorized = verifyToken(token);

    if (isAuthorized) {
      const { userId } = decodeToken(token);
      const blogId = req.params.id;

      const newComment = new Comment({
        text: req.body.text,
        author: req.body.author,
        userId: userId,
        blogId: blogId,
      });
      await newComment.save();
      res.status(201).send(newComment);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(403).send(err);
  }
});

// update new comment when given comment id
router.put("/comment/:id", async (req, res) => {
  try {
    const token = req.cookies.access_token;
    const isAuthorized = verifyToken(token);

    if (isAuthorized) {
      const { userId } = decodeToken(token);
      const comment = await Comment.findById(req.params.id);
      console.log(comment);
      console.log(userId);
      if (userId === comment.userId) {
        comment.author = req.body.author;
        comment.text = req.body.text;
        const updatedcomment = await Comment.findByIdAndUpdate(
          req.params.id,
          comment
        );
        console.log(updatedcomment);
        res.status(201).send(updatedcomment);
      } else {
        res.status(403).send("You can't delete another author's comment");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//  delete comment when given comment id
router.delete("/comment/:id", async (req, res) => {
  try {
    const token = req.cookies.access_token;
    const isAuthorized = verifyToken(token);

    if (isAuthorized) {
      const { userId } = decodeToken(token);
      const comment = await Comment.findById(req.params.id);
      if (userId === comment.userId) {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        console.log(deletedComment);
        res.status(201).send(deletedComment);
      } else {
        res.status(403).send("You can't delete another author's comment");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
