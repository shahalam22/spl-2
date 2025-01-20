import express from "express";
import * as bidController from "../controllers/bidController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, bidController.createBid);
router.get("/event/:eventId", bidController.getBidsByEvent);
router.get("/:id", bidController.getBid);
router.put("/:id", protect, bidController.updateBid);
router.delete("/:id", protect, bidController.deleteBid);

export default router;
