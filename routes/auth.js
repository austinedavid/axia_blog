const express = require("express");
const { register, loginUser } = require("../controllers/auth");
const routes = express.Router();

routes.post("/user", register);
routes.post("/login", loginUser);

module.exports = routes;
