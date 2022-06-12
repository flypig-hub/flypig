const express = require("express");
const User = require("../models/user");
const Comment = require("../models/comment");
const Content = require("../models/content");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

async function postcom(req, res) {
  
 
  const { nickname } = res.locals.user;
  const { comment } = req.body;
  const { contentId } = req.params;
  const contentcomment = await Comment.create({
    comment,
    nickname,
    contentId
  });
  res.json({ comment: contentcomment });
  res.status(201).json({ result: "success", msg: "댓글이 등록되었습니다." });
};


async function getcom (req, res)  {
  const { contentId } = req.params;
  const { comment, updateAt } = await Comment.find({
    contentId: String(contentId),
  })
    .sort("-updateAt")
    .exec();

  
  res.json({
    comment,
  });

  res.json;
  res.status(201).json();
};

  async function patchcom (req, res)  {
    //db에서 commnet.nickname이랑 nickname 일치하는지 확인하고 commnetId찾아서 (중요) 해결. 
    const { contentId } = req.params;
    const { fixedcontent } = req.body;
    //const { nickname } = res.locals.user;
    const { comment, commentId } = await Comment.findById(contentId);

    function timesetkr() {
      const gettime = new Date(); 
      const utcNow =
        gettime.getTime() + gettime.getTimezoneOffset() * 60 * 1000;
      const koreaTimeDiff = 9 * 60 * 60 * 1000;
      const krtime = new Date(utcNow + koreaTimeDiff);
    }
    timesetkr();
    if (krtime !== comment.updateAt) {
      await Comment.findByIdAndUpdate(updateAt, { krtime });
    }
    //if (nickname !== comment.nickname)
    //{
    //  res.status(403).json({
     //   msg:"댓글 작성자만 댓글을 삭제할 수 있습니다."
    //  })
    //};
      if (comment) {
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
          msg: "댓글 수정에 실패했습니다.",
        });
    };
  };

// *** 댓글 삭제 API

  async function delcom (req, res) {
    const { contentId } = req.params;
    const { comment, commentId } = await Comment.findById(contentId);
    
    //const { nickname } = res.locals.user;
    
    console.log(comment);
    //if (nickname !== comment.nickname)
    //{
    //  res.status(403).json({
    //   msg:"댓글 작성자만 댓글을 삭제할 수 있습니다."
    //  })
    //};
    if (Comment) {
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
  };


module.exports.postcom = postcom;
//module.exports.commentList = commentList;
module.exports.patchcom = patchcom;
//module.exports.getpatchedcom = getpatchedcom;
module.exports.delcom = delcom;
module.exports.getcom = getcom;