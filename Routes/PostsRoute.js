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
router.use(validateToken);

router.route("").post(formidable(), CreatePosts).get(getPosts);
router.route("/my-posts").get(getMyPosts);
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
