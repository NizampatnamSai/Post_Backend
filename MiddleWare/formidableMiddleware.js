const formidable = require("express-formidable");

const formidableMiddleware = (req, res, next) => {
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err });
    }
    req.fields = fields; // Store text fields
    req.files = files; // Store uploaded files
    next(); // Proceed to next middleware
  });
};

// Apply middleware to route
// router.route("").post(formidableMiddleware, CreatePosts).get(getPosts);
module.exports = {
  formidableMiddleware,
};
