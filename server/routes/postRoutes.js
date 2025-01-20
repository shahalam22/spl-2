import express from "express";
import * as postController from "../controllers/postController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.put("/:id", protect, postController.updatePost);
router.delete("/:id", protect, postController.deletePost);

export default router;
