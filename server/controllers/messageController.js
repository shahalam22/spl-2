import * as messageService from "../services/messageService.js";
import catchAsync from "../utils/catchAsync.js";

export const sendMessage = catchAsync(async (req, res) => {
  const message = await messageService.createMessage({
    ...req.body,
    sender_id: req.user.user_id,
  });
  res.status(201).json({ success: true, data: message });
});

export const getMessages = catchAsync(async (req, res) => {
  const messages = await messageService.getMessagesByUser(req.user.user_id);
  res.status(200).json({ success: true, data: messages });
});

export const getEventMessages = catchAsync(async (req, res) => {
  const messages = await messageService.getMessagesByEvent(req.params.eventId);
  res.status(200).json({ success: true, data: messages });
});
