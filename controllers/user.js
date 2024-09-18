const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const updateUserInfo = async (req, res) => {
  const { password, ...others } = req.body;
  const { id } = req.user;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, others, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;
  try {
    const getUser = await userModel.findById(id);
    if (oldPassword !== getUser.password) {
      return res.json({ message: "password does not match" });
    }
    await userModel.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true }
    );
    res.json({ message: "password updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  try {
    await userModel.findByIdAndDelete(id);
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateRole = async (req, res) => {
  const { id } = req.body;
  const { role } = req.user;
  console.log(role);
  if (role !== "SuperAdmin" && role !== "Admin") {
    return res.json({ message: "you don't have the permission" });
  }
  try {
    await userModel.findByIdAndUpdate(id, { role: "Admin" }, { new: true });
    res.json({ message: "user is now an admin" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateUserInfo,
  updatePassword,
  deleteUser,
  updateRole,
};
