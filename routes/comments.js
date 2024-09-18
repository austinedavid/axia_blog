const express = require("express");
const { makeComment, getComment } = require("../controllers/comment");
const { verify } = require("../middlewares/verify");
const router = express.Router();

router.post("/comments", verify, makeComment);
router.get("/comment", getComment);

module.exports = router;
