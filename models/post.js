const mongoose = require("mongoose");

// create post schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    previewPix: {
      type: String,
      required: true,
    },
    detailPix: {
      type: String,
      required: true,
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "User",
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("POSTS", postSchema);
module.exports = postModel;
