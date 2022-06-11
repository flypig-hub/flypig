const express = require("express");
const Comment = require("../models/comment")
const authMiddleware = require("../middlewares/auth-middleware");
const router = require("./contentRouter");
const commentController = require("../controller/commentController");
const { json } = require("express");


router.get("/content/contentId/", authMiddleware, async (req, res) => {
  const { contentId } = req.params;
  const { userId } = res.locals.user;
  const { comment } = await Comment.find({ commentId: Number(commentId) })
    //.sort("-order")
    //.exec();

  res.json({
    post,
    comment,
  });

  res.json;
  res.status(201).json();
});
module.exports = router;