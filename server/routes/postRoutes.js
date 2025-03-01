import express from "express";
import * as postController from "../controllers/postController.js";
import { protect } from "../middlewares/auth.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/", protect, upload.array("images",5),  postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.put("/:id", protect, postController.updatePost);
router.delete("/:id", protect, postController.deletePost);

export default router;
