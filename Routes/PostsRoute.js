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
} = require("../Controllers/PostsController");
const router = express.Router();

router.route("").post(formidable(), CreatePosts).get(getPosts);
router
  .route("/:id")
  .get(getPostsById)
  .patch(formidable(), editPostsById)
  .delete(deletePostsById);
router
  .route("/comments/:id")
  .get(getCommentsById)
  .post(formidable(), PostCommentsById);
router.route("/likes/:id").get(getLikesById).post(PostLikesById);

module.exports = router;
