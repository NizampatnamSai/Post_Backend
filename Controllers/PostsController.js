const asyncHandler = require("express-async-handler");
const fs = require("fs");
const Post = require("../Modal/PostModal");
const { default: mongoose } = require("mongoose");

const CreatePosts = asyncHandler(async (req, res) => {
  // const { image, title } = req.body;
  // await mongoose.connection.db.collection("posts").dropIndex("email_1");

  console.log(req.user, "userss");
  const { title } = req.fields;
  const { image } = req.files;
  const { username, email, id } = req.user;
  if (!image && !title) {
    return res.json({
      message: "image or title is required",
      status: false,
      data: [],
    });
  }
  const Posts = await Post.create({
    username,
    email,
    title,
    userId: id,
    // password: hashedPassword,
  });

  // res.json({
  //   message: "This is Posts create API",
  //   status: true,
  //   data: [],
  // });

  if (Posts) {
    return res.status(201).json({
      id: Posts.id,

      status: true,
      message: "Successfully Created",
    });
  } else {
    return res
      .status(400)
      .json({ message: "Data is not valid", status: false });
  }
});

const getPosts = asyncHandler(async (req, res) => {
  const Posts = await Post.find();

  console.log("This is Posts get API", Posts);
  res.json({
    message: "This is Posts get API",
    status: true,
    data: Posts,
  });
});

const getMyPosts = asyncHandler(async (req, res) => {
  const { username, email, id } = req.user;
  const Posts = await Post.find({ email });
  console.log(email, "email");
  res.json({
    message: `Yours Posts ${id}`,
    status: true,
    data: Posts,
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
  getMyPosts,
};
