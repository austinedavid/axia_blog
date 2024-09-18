const express = require("express");
const {
  makePost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/post");
const { verify } = require("../middlewares/verify");
const routes = express.Router();

routes.post("/post", verify, makePost);
routes.get("/post", getAllPost);
routes.get("/post/:id", verify, getSinglePost);
routes.put("/post", updatePost);
routes.delete("/post", deletePost);
routes.post("/post/like", likePost);

module.exports = routes;
