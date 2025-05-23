const asyncHandler = require("express-async-handler");
const fs = require("fs");
const Post = require("../Modal/PostModal");
const { default: mongoose } = require("mongoose");

const cloudinary = require("../utils/cloudinary.js"); // adjust path if needed

const CreatePosts = asyncHandler(async (req, res) => {
  const { title } = req.fields;
  const { image } = req.files;

  const { username, email, id } = req.user;

  if (!image && !title) {
    return res.json({
      message: "Image or title is required",
      status: false,
      data: [],
    });
  }

  let imageUrl = "";

  if (image) {
    try {
      // Upload to cloudinary
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "posts",
      });

      imageUrl = result.secure_url;

      // Delete local temp file
      fs.unlinkSync(image.path);
    } catch (err) {
      console.error("Cloudinary error:", err);
      return res.status(500).json({
        message: "Failed to upload image",
        status: false,
      });
    }
  }

  const Posts = await Post.create({
    username,
    email,
    title,
    userId: id,
    image: imageUrl,
  });

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
  // const Posts = await Post.find();
  const Posts = await Post.find()?.sort({ createdAt: -1 });

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
  const { id } = req.params; // Get the ID from URL params

  try {
    if (!id || id?.toString()?.length < 24) {
      return res.status(400).json({
        message: "Please pass valid ID",
        status: false,
        data: null,
      });
    }
    const post = await Post.findById(id); // Fetch post by ID

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        status: false,
        data: null,
      });
    }

    res.json({
      message: "Post fetched successfully",
      status: true,
      data: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching the post",
      status: false,
      data: null,
    });
  }
});

const editPostsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.fields;
  const { image } = req.files;

  if (!title && !image) {
    return res.json({
      message: "Image or title is required",
      status: false,
      data: [],
    });
  }

  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ message: "Post not found", status: false });
  }

  // Update title if provided
  if (title) post.title = title;

  // Handle image upload if provided
  if (image) {
    try {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "posts",
      });

      post.image = result.secure_url;

      // Delete temp file
      fs.unlinkSync(image.path);
    } catch (err) {
      console.error("Cloudinary error:", err);
      return res.status(500).json({
        message: "Failed to upload image",
        status: false,
      });
    }
  }

  await post.save();

  res.json({
    message: "Post updated successfully",
    status: true,
    data: post,
  });
});

const deletePostsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id || id?.toString()?.length < 24) {
    return res.status(400).json({
      message: "Please pass valid ID",
      status: false,
      data: null,
    });
  }
  console.log(id, "id");
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
      status: false,
    });
  }

  // Optional: delete image from Cloudinary if exists
  if (post.image) {
    // Extract public_id from the URL if you want to delete the image
    const publicIdMatch = post.image.match(
      /\/posts\/(.+?)\.(jpg|jpeg|png|webp)/
    );
    if (publicIdMatch) {
      const publicId = `posts/${publicIdMatch[1]}`;
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.warn("Cloudinary image delete failed:", err.message);
        // Not critical, proceed with post deletion
      }
    }
  }

  // Delete the post from DB
  await post.deleteOne();

  res.json({
    message: "Post deleted successfully",
    status: true,
    data: { id },
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
