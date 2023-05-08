import { Router } from "express";
import { createPost, deletePost, getOwnPosts, getPosts, updatePost, } from "../controllers/postController.js";
import protect from "../middleware/protect.js";
const postRouter = Router();
postRouter
    .get("/all", protect, getPosts)
    .get("/", protect, getOwnPosts)
    .post("/", protect, createPost)
    .put("/:id", protect, updatePost)
    .delete("/:id", protect, deletePost);
export default postRouter;
