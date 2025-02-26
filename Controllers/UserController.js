const asyncHandler = require("express-async-handler");
const User = require("../Modal/userModal");
const bcrypt = require("bcrypt");

const RegisterUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username) {
    return res.json({
      message: "Name is required for Create New User",
      status: false,
      data: [],
    });
  }
  if (!email) {
    return res.json({
      message: "Email is required for Create New User",
      status: false,
      data: [],
    });
  }
  if (!password) {
    return res.json({
      message: "Password is required for Create New User",
      status: false,
      data: [],
    });
  }

  const isEmailAvailable = await User.findOne({ email });
  const isUserNameAvailable = await User.findOne({ username });
  if (isEmailAvailable) {
    return res.json({
      message: "This email already exists, Please use another one",
      status: false,
      data: [],
    });
  }
  if (isUserNameAvailable) {
    return res.json({
      message: "This user name already exists, Please use another one",
      status: false,
      data: [],
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    return res.status(201).json({
      _id: user.id,
      email: user.email,
      status: true,
      message: "Successfully registered",
    });
  } else {
    return res
      .status(400)
      .json({ message: "User data is not valid", status: false });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username && !email) {
    return res.json({
      message: "Name or email is required for Login",
      status: false,
      data: [],
    });
  }

  if (!password) {
    return res.json({
      message: "Password is required for Login",
      status: false,
      data: [],
    });
  }

  const isEmailAvailable = await User.findOne({ email });
  const isUserNameAvailable = await User.findOne({ username });
  if (email && !isEmailAvailable && !isUserNameAvailable) {
    return res.json({
      message: "This email not existed",
      status: false,
      data: [],
    });
  }
  if (username && !isUserNameAvailable && !isEmailAvailable) {
    return res.json({
      message: "This username not existed",
      status: false,
      data: [],
    });
  }
  res.json({
    message: "This is for Login User",
    status: true,
    data: [],
  });
});

const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.json({
    status: true,
    message: "Users list retrieved",
    data: users,
  });
};

module.exports = {
  RegisterUser,
  loginUser,
  getAllUsers,
};
