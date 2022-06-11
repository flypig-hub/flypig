const express = require("express");
const Content = require("../models/content");
const User = require("../models/user");
const authMiddleware = require("../middlewares/auth-middleware");
const Comment = require("../models/comment");
const ContentController = require("../controller/contentController")

const router = express.Router();

// 게시물 목록 API
//router.get("/", ContentController.Contentlist);

// 게시물 쓰기 API
//router.post("/", authMiddleware, ContentController.writeContent);

// 게시물 상세 조회
//router.get("/:ContentId", ContentController.getContent);

module.exports = router;



// 글쓰기 접근 시 사용자 정보를 가져가기 위한 메소드. write.ejs > getAuthorInfo()
// router.get('/Content/write', authMiddleware, async (req, res) => {
//     const { userId } = res.locals.user;
//     const authorInfo = await User.findById(authorId);
//     res.status(200).send({
//         author: {
//             authorId: authorId,
//             authorName: authorInfo.authorName,
//         },
//     });
// });*/