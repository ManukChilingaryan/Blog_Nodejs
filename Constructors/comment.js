"use strict";
const mongoose = require("mongoose");

//create a Comment model
const commentSchema = mongoose.Schema({
  text:   { type: String },
  author: {type: String  },
  userId: { type: String },
  blogId: { type: String },
});

const Comment = mongoose.model("Comment", commentSchema, "Comment_Storage");

module.exports = Comment;
