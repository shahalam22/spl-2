import express from "express";
import * as notificationController from "../controllers/notificationController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, notificationController.createNotification);
router.get("/", protect, notificationController.getNotifications);
router.put("/:id", protect, notificationController.markNotificationAsRead);
router.delete("/:id", protect, notificationController.deleteNotification);

export default router;
