const express = require("express");
const { RegisterUser, loginUser } = require("../Controllers/UserController");

const route = express.Router();

route.route("/register").post(RegisterUser);
route.route("/login").post(loginUser);

module.exports = route;
