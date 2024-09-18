const postModel = require("../models/post");

// create a post
const makePost = async (req, res) => {
  const { creatorId, ...others } = req.body;
  const { id } = req.user;
  const newPost = new postModel({ ...others, creatorId: id });
  try {
    await newPost.save();
    res.json({ message: "post created successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get all the post
const getAllPost = async (req, res) => {
  try {
    const allpost = await postModel
      .find()
      .populate({ path: "creatorId", select: "username email gender" })
      .populate({ path: "comments", select: "comment commentorsId" });
    res.json(allpost);
  } catch (error) {
    console.log(error.message);
  }
};

// get a single post
const getSinglePost = async (req, res) => {
  console.log(req.user);
  const { id } = req.params;
  try {
    const onePost = await postModel.findById(id);
    res.json(onePost);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// updating a post
const updatePost = async (req, res) => {
  const { id, creatorId, likes, ...others } = req.body;
  // first get the post
  const post = await postModel.findById(id);

  if (post.creatorId.toString() !== creatorId) {
    return res.json({ message: "you can only update your post" });
  }
  try {
    await postModel.findByIdAndUpdate(id, { ...others }, { new: true });
    res.json({ message: "updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// deleting a post
const deletePost = async (req, res) => {
  const { id, creatorId } = req.body;
  // first get the post
  const post = await postModel.findById(id);
  if (post.creatorId.toString() !== creatorId) {
    return res.json({ message: "you can only delete your post" });
  }
  try {
    await postModel.findByIdAndDelete(id);
    res.json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// make a like or dislike
const likePost = async (req, res) => {
  const { id, userId } = req.body;
  const thePost = await postModel.findById(id);
  if (!thePost) {
    return res.json({ message: "No such post" });
  }
  // creating new array that will hold all the likes
  const gottenLikes = thePost.likes;
  const checkUserInArray = gottenLikes.includes(userId);
  if (!checkUserInArray) {
    gottenLikes.push(userId);
  } else {
    const getIndex = gottenLikes.indexOf(userId);
    gottenLikes.splice(getIndex, 1);
  }
  //  update the database
  try {
    await postModel.findByIdAndUpdate(
      id,
      { likes: gottenLikes },
      { new: true }
    );
    res.json({ message: "you have liked this post" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  makePost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
};
