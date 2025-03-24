const asyncHandler = require("express-async-handler");
const User = require("../Modal/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  if (user) {
    return res.status(201).json({
      status: true,
      message: "Successfully registered",
      accessToken,
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    });
  } else {
    return res
      .status(400)
      .json({ message: "User data is not valid", status: false });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let UserEmail;
  let UserName;
  if (emailRegex.test(email)) {
    UserEmail = email;
  }
  if (!emailRegex.test(email)) {
    UserName = email;
  }
  if (!UserName && !UserEmail) {
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

  const isEmailAvailable = await User.findOne({ UserEmail });
  const isUserNameAvailable = await User.findOne({ UserName });
  console.log(isEmailAvailable, isUserNameAvailable, "isUserNameAvailable");
  if (UserEmail && !isEmailAvailable && !isUserNameAvailable) {
    return res.json({
      message: "This email not existed",
      status: false,
      data: [],
    });
  }
  if (UserName && !isUserNameAvailable && !isEmailAvailable) {
    return res.json({
      message: "This username not existed",
      status: false,
      data: [],
    });
  }
  let passwordMatchWithEmail =
    isEmailAvailable &&
    (await bcrypt.compare(password, isEmailAvailable.password));
  let passwordMatchWithUserName =
    isUserNameAvailable &&
    (await bcrypt.compare(password, isUserNameAvailable.password));
  if (!passwordMatchWithEmail && !passwordMatchWithUserName) {
    return res.json({
      message: "Password Not matched!",
      status: false,
      data: [],
    });
  }
  let reqUser = passwordMatchWithEmail ? isEmailAvailable : isUserNameAvailable;
  console.log(reqUser, "reqUser");
  const accessToken = jwt.sign(
    {
      user: {
        username: reqUser.username,
        email: reqUser.email,
        id: reqUser.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.json({
    message: "SuccessFully Login",
    status: true,
    accessToken,
    user: {
      username: reqUser.username,
      email: reqUser.email,
      id: reqUser.id,
    },
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
