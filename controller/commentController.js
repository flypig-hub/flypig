const express = require("express");
const User = require("../models/user");
const Comment = require("../models/comment");
const Content = require("../models/content");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/comments/write", authMiddleware, async (req, res) => {
  //url 설정
  function checkcheckContentTitle(req, res, next) {
    Content.findOne({ _id: req.query.contentId }, function (err, content) {
      if (err) return res.json(err);

      res.locals.content = content;
      next();
    });
  }
  checkcheckContentTitle();
  const { userId } = res.locals.user;
  const { nickname, comment, updateAt } = req.body;
  const { contentId } = res.locals.content;
  //req.body에서 nickname을 가져와야하는데
  //contentId를 가져올 수 없을까
  const contentcomment = await Comment.create({
    contentId,
    userId,
    comment,
    updateAt,
    nickname,
  });
  res.json({ comment: contentcomment });
  res.status(201).json({ result: "success", msg: "댓글이 등록되었습니다." });
});

// *** 댓글 수정 API
router.patch(
  "/comments/:commentId/modify",
  authMiddleware,
  async (req, res) => {
    const { commentId, fixedcontent } = req.body;
    const { userId } = res.locals.user;
    //버튼 클릭 시 commentId랑 userid를 가지고 올 수 있는가?
    const comment = await Comment.findById(commentId);
    const content = await Content.findbyId(contentId);
    const gettime = new Date();
    const utcNow = gettime.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const now = new Date(utcNow + koreaTimeDiff);
    async function existedComment(commentId) {
      comment = await Comment.findById(commentId);
    }
    existedComment();
    if (now !== comment.updateAt) {
      await Comment.findByIdAndUpdate(updateAt, { now });
    }
    if (userId !== content.userId)
      if (comment) {
        //if(userId = user.userId)
        const fixedComment = await Comment.findByIdAndUpdate(commentId, {
          $set: { comment: fixedcontent },
        });
        res.status(201).json({
          result: "success",
          msg: "댓글이 수정되었습니다.",
        });
      } else {
        res.status(400).json({
          result: "error",
          msg: "댓글 수정에 실패했습니다..",
        });
      }
  }
);

// *** 댓글 삭제 API
router.delete(
  "/comments/:commentId/delete",
  authMiddleware,
  async (req, res) => {
    const { commentId } = req.params;
    const existsComment = await Comment.findById(commentId);
    //console.log(commentId);
    if (existsComment) {
      await Comment.findByIdAndDelete(commentId); // commentId 일치하는 것으로 삭제
      res.status(200).json({
        result: "success",
        msg: "코멘트가 삭제되었습니다.",
      });
    } else {
      res.status(400).json({
        result: "error",
        msg: "코멘트가 정상적으로 삭제되지 않았습니다.",
      });
    }
  }
);
