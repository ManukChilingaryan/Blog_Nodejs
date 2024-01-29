"use strict";
const mongoose = require("mongoose");

// create a Blog model
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  userId:{type:String},
  timestamp: {
    type: String,
    default: () => {
      const currentDate = new Date();
      const date =
        currentDate.getFullYear() +
        " " +
        (currentDate.getMonth() + 1).toString().padStart(2, "0") +
        " " +
        currentDate.getDay().toString().padStart(2, "0");
      const time =
        "time " +
        currentDate.getHours().toString().padStart(2, "0") +
        ":" +
        currentDate.getMinutes().toString().padStart(2, "0");
      return date + " " + time;
    },
  },
});

const Blog = mongoose.model("Blog", blogSchema, "Blog_Storage");
module.exports = Blog;
