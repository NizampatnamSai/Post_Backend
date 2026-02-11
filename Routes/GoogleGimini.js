const express = require("express");
const validateToken = require("../MiddleWare/validateTokenHandler");
const router = express.Router();
const {
  PostLikesById,

  generateGeminiPostsPost,
  generatePostWithAI,
  generatePostWithGroq,
} = require("../Controllers/GoogleGimniController");
// POST → Ask AI to generate post text

// router.post("/generate-post", generateGeminiPostsPost);
router.post("/generate-post", generatePostWithGroq);

module.exports = router;
