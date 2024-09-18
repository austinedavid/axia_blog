const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "POSTS",
  },
  commentorsId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;
