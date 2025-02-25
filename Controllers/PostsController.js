const asyncHandler = require("express-async-handler");
const fs = require("fs");
const CreatePosts = asyncHandler(async (req, res) => {
  const { image, title } = req.body;
  console.log("Fields:", req.fields); // Text fields from FormData
  console.log("Files:", req.files);
  if (!image && !title) {
    return res.json({
      message: "image or title is required",
      status: false,
      data: [],
    });
  }

  res.json({
    message: "This is Posts create API",
    status: true,
    data: [],
  });
});

const getPosts = asyncHandler(async (req, res) => {
  console.log("This is Posts get API");
  res.json({
    message: "This is Posts get API",
    status: true,
    data: [],
  });
});

const getPostsById = asyncHandler(async (req, res) => {
  console.log("This is Posts get by ID API");
  res.json({
    message: "This is Posts get by ID API",
    status: true,
    data: [],
  });
});

const editPostsById = asyncHandler(async (req, res) => {
  const { title } = req.fields;
  const { image } = req.files;
  if (!image && !title) {
    return res.json({
      message: "image or title is required",
      status: false,
      data: [],
    });
  }
  const imageBase64 = fs.readFileSync(image?.path, { encoding: "base64" });

  res.json({
    message: "This is Posts edit by ID API",
    status: true,
    data: {
      title,
      image: `data:${image?.type};base64,${imageBase64}`, // Base64 encoded image
    },
  });
});

const deletePostsById = asyncHandler(async (req, res) => {
  res.json({
    message: "This is Posts delete by ID API",
    status: true,
    data: [],
  });
});

const PostCommentsById = asyncHandler(async (req, res) => {
  const { title } = req.fields;
  const { image } = req.files;
  console.log(image, title, "imageimage");

  if (!image && !title) {
    return res.json({
      message: "image or title is required",
      status: false,
      data: [],
    });
  }
  const imageBase64 = fs.readFileSync(image?.path, { encoding: "base64" });

  res.json({
    message: "This is Posts comments by ID API",
    status: true,
    data: {
      title,
      image: `data:${image.type};base64,${imageBase64}`, // Base64 encoded image
    },
  });
});
const getCommentsById = asyncHandler(async (req, res) => {
  res.json({
    message: "This is get comments by ID API",
    status: true,
    data: [],
  });
});
const PostLikesById = asyncHandler(async (req, res) => {
  res.json({
    message: "This is Posts Likes by ID API",
    status: true,
    data: [],
  });
});
const getLikesById = asyncHandler(async (req, res) => {
  res.json({
    message: "This is get Likes by ID API",
    status: true,
    data: [],
  });
});
module.exports = {
  CreatePosts,
  getPosts,
  getPostsById,
  editPostsById,
  deletePostsById,
  PostCommentsById,
  getCommentsById,
  PostLikesById,
  getLikesById,
};
