import express from "express";
import {
  getPosts,
  deletePost,
  setPost,
  updatePost,
} from "../controllers/posts.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(protect, getPosts).post(protect, setPost);
router.route("/:id").delete(protect, deletePost).put(protect, updatePost);

export default router;
