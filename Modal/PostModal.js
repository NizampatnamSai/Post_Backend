const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email"],
    },
    title: {
      type: String,
      required: [true, "Please add the user password"],
    },
    image: {
      type: Object,
      // required: [true, "Please add the user password"],
    },
    userId: {
      type: String,
      // required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
// Compare this snippet from Routes/ContactRoute.js:
