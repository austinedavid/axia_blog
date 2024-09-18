const express = require("express");
const routes = express.Router();
const {
  updateUserInfo,
  updatePassword,
  deleteUser,
  updateRole,
} = require("../controllers/user");
const { verify } = require("../middlewares/verify");

// creating our endpoint
routes.put("/user", verify, updateUserInfo);
routes.put("/change-password", verify, updatePassword);
routes.delete("/delete-user", verify, deleteUser);
routes.put("/change-role", verify, updateRole);

module.exports = routes;
