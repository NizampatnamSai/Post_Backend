const asyncHandler = require("express-async-handler");

const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
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
  res.json({
    message: "This is for Create New User",
    status: true,
    data: [],
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.json({
      message: "Name is required for Login",
      status: false,
      data: [],
    });
  }
  if (!email) {
    return res.json({
      message: "Email is required for Login",
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
  res.json({
    message: "This is for Login User",
    status: true,
    data: [],
  });
});

module.exports = {
  RegisterUser,
  loginUser,
};
