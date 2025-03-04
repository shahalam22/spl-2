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
});

const upload = multer({ storage });

const router = express.Router();

// Apply the protect middleware to routes that require authentication
router.post("/", protect, upload.array("image", 1), eventController.createEvent);
router.get("/", eventController.getAllEvents);
// router.get("/:id", eventController.getEvent);
router.get("/:id", eventController.getAllOfCurrentEvent);
router.put("/:id", protect, eventController.updateEvent);
router.delete("/:id", protect, eventController.deleteEvent);

// Add protect middleware to the register route
router.post("/register", protect, eventController.registerForEvent);
router.post("/unregister", protect, eventController.unregisterFromEvent);
// http://localhost:5000/api/events/${eventId}/participants

export default router;