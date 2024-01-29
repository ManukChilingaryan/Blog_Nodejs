const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require("../Constructors/blog");
const Comment = require("../Constructors/comment");

// get all blogposts and comments
router.get("/home", async (req, res) => {
    try{
        const allBlogs = await Blog.find({});
        const allComments = await Comment.find({});
        const allContent = allBlogs + allComments;
        res.send(allContent);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;
