const commentModel = require("../models/comment");
const postModel = require("../models/post");

// creating a comment below
const makeComment = async (req, res) => {
  const { comment, postId } = req.body;
  const { id } = req.user;

  try {
    // first create the comment
    const newComment = new commentModel({ comment, commentorsId: id, postId });
    const savedComment = await newComment.save();
    // modify the post comments field
    await postModel.findByIdAndUpdate(postId, {
      $push: { comments: savedComment.id },
    });
    res.json({ message: "comment made successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getComment = async (req, res) => {
  const { commentId } = req.query;
  try {
    const oneComment = await commentModel
      .findById(commentId)
      .populate({ path: "commentorsId", select: "username email gender " })
      .populate({ path: "postId", select: " title desc" });
    res.json(oneComment);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { makeComment, getComment };
