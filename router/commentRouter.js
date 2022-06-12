const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const commentController = require("../controller/commentController");



//post
router.post("/:contentId", authMiddleware, commentController.postcom);

// get
router.get("/:contentId", authMiddleware, commentController.getcom);

// patch
router.patch("/:contentId", authMiddleware, commentController.patchcom);


// delete

router.delete("/:contentId", authMiddleware, commentController.delcom);
module.exports = router;