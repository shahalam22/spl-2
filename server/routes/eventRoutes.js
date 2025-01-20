import express from "express";
import * as eventController from "../controllers/eventContoller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEvent);
router.put("/:id", protect, eventController.updateEvent);
router.delete("/:id", protect, eventController.deleteEvent);

export default router;
