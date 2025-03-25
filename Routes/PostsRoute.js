const express = require("express");
const formidable = require("express-formidable");
const {
  CreatePosts,
  getPosts,
  getPostsById,
  editPostsById,
  deletePostsById,
  getCommentsById,
  PostCommentsById,
  getLikesById,
  PostLikesById,
  getMyPosts,
} = require("../Controllers/PostsController");
const validateToken = require("../MiddleWare/validateTokenHandler");

const router = express.Router();

// Public Routes (No Token Validation)
router.get("", getPosts);
router.get("/likes/:id", getLikesById);
router.get("/comments/:id", getCommentsById);

// Protected Routes (With Token Validation)
router.post("", validateToken, formidable(), CreatePosts);
router.get("/my-posts", validateToken, getMyPosts);
router
  .route("/:id")
  .get(validateToken, getPostsById)
  .patch(validateToken, formidable(), editPostsById)
  .delete(validateToken, deletePostsById);
router.post("/comments/:id", validateToken, formidable(), PostCommentsById);
router.post("/likes/:id", validateToken, PostLikesById);

module.exports = router;
