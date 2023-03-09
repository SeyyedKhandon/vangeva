import asyncHandler from "express-async-handler";
import postModel from "../models/post.js";

/**
 *
 * @desc Get All Posts
 * @route GET /api/posts
 * @access Private
 */
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await postModel
    .find({})
    .sort({ createdAt: -1 })
    .select("-userId -__v");
  res.json(posts);
});

/*
 * @desc Get Posts
 * @route GET /api/posts/:id
 * @access Private
 */
const getPosts = asyncHandler(async (req, res) => {
  const posts = await postModel.find({ userId: req.user.id });
  res.json(posts);
});

/**
 *
 * @desc Set Posts
 * @route POST /api/posts
 * @access Private
 */
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.text && !req.body.text) {
    res.status(400);
    throw new Error("Text field is missing!");
  }
  const post = await postModel.create({
    userId: req.user.id,
    title: req.body.title,
    text: req.body.text,
    thumbnailUrl: req.body.thumbnailUrl,
    author: req.user.name,
  });
  res.json(post);
});

/**
 *
 * @desc Update Post
 * @route PUT /api/posts/:id
 * @access Private
 */
const updatePost = asyncHandler(async (req, res) => {
  if (!req.body.text && !req.body.text) {
    res.status(400);
    throw new Error("Please provide a text field!");
  }
  const post = await postModel.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found!");
  }
  if (post.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }
  const updatedPost = await postModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedPost);
});

/**
 *
 * @desc Get Posts
 * @route DELETE /api/posts/:id
 * @access Private
 */
const deletePost = asyncHandler(async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found!");
  }
  if (post.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }
  await post.remove();
  res.json(post);
});

export { getAllPosts, getPosts, setPost, updatePost, deletePost };
