import express from "express";
import * as messageController from "../controllers/messageController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, messageController.sendMessage);
router.get("/", protect, messageController.getMessages);
router.get("/event/:eventId", protect, messageController.getEventMessages);
router.delete("/:messageId", protect, messageController.deleteMessage);
router.put("/:messageId", protect, messageController.updateMessageStatus);
router.get("chat-users/:userId", protect, messageController.getChatUsers);
router.get(`/:userId/:anotherUserId`, protect, messageController.getMessagesByUsers);

export default router;
