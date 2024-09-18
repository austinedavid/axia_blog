const bcrypt = require("bcryptjs");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

// registering new user
const register = async (req, res) => {
  const { password, role, ...others } = req.body;
  const hashedPssword = bcrypt.hashSync(password, 10);
  const newUser = new userModel({
    ...others,
    password: hashedPssword,
    role: "Basic",
  });
  try {
    await newUser.save();
    res.json({ message: "account created successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// login a user
const loginUser = async (req, res) => {
  // get the body
  const { email, password } = req.body;
  try {
    // check if the user exist
    const userInfo = await userModel.findOne({ email });
    if (!userInfo) {
      return res.json({ message: "User not found" });
    }
    // check if password matches
    const verify = bcrypt.compareSync(password, userInfo.password);
    if (!verify) {
      return res.json({ message: "passwords do not match" });
    }
    const aboutUser = { id: userInfo.id, role: userInfo.role };
    const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
    res.cookie("user_token", token);
    res.json({ message: "user logged in successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  register,
  loginUser,
};
