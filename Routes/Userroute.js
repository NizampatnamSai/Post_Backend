const express = require("express");
const {
  RegisterUser,
  loginUser,
  getAllUsers,
} = require("../Controllers/UserController");

const route = express.Router();

route.route("/register").post(RegisterUser);
route.route("/login").post(loginUser);
route.route("").get(getAllUsers);

module.exports = route;
