import express from "express";
import {
  getPosts,
  deletePost,
  setPost,
  updatePost,
  getAllPosts,
} from "../controllers/posts.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, setPost);
router
  .route("/:id")
  .get(protect, getPosts)
  .delete(protect, deletePost)
  .put(protect, updatePost);

export default router;
