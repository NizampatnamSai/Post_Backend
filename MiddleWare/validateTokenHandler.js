const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader?.split(" ")?.[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: false,
          message: "User is not authorized or token expired",
        });
      }

      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    res.status(401).json({
      status: false,
      message: "Token not provided !",
    });
  }
});

module.exports = validateToken;
