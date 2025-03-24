const express = require("express");
const { CreatePosts } = require("./Controllers/PostsController");
const dotEnv = require("dotenv").config();
const cors = require("cors");

const port = 7001;
const app = express();
const formidable = require("express-formidable");
const connectDb = require("./config/dbConnection");
connectDb();

//normal Process
/*
//Posts route

app.get("/posts", (req, res) => {
  console.log("This is Posts get API");
});

app.post("/posts", (req, res) => {
  console.log("This is to create new posts");
});
app.get("/posts/:id", (req, res) => {
  console.log("This is to get post by ID");
});

app.patch("posts/:id", (req, res) => {
  console.log("This is to update post by ID, required edit access by Admin");
});
app.delete("posts/:id", (req, res) => {
  console.log("This is to update post by ID");
});

app.get("/posts/comments/:id", (req, res) => {
  console.log("This is to get post Comments by ID");
});
app.get("/posts/likes/:id", (req, res) => {
  console.log("This is to get post Likes by ID");
});

// Users
app.post("/user/register", (req, res) => {
  console.log("This is to register new user");
});
app.post("/user/login", (req, res) => {
  console.log("This is to login the user");
});
*/
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// // Use formidable middleware
// app.use(formidable());

app.use("/posts", require("./Routes/PostsRoute"));
app.use("/user", require("./Routes/Userroute"));
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
