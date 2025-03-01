import express from "express";
import * as eventController from "../controllers/eventContoller.js";
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
})

const upload = multer({ storage});

const router = express.Router();

router.post("/", protect, upload.array("image", 1), eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEvent);
router.put("/:id", protect, eventController.updateEvent);
router.delete("/:id", protect, eventController.deleteEvent);

export default router;
