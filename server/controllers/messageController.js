import jwt from 'jsonwebtoken';
import * as messageService from "../services/messageService.js";
import catchAsync from "../utils/catchAsync.js";

// Function to extract and verify user ID from Bearer token
const getUserIdFromToken = (authorizationHeader, secretKey) => {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new Error('Authorization header is missing or invalid');
  }

  const token = authorizationHeader.split(' ')[1]; // Extract the token
  const decoded = jwt.verify(token, secretKey); // Verify the token with the secret key

  return decoded.id; // Assuming the token payload contains `user_id`
};

export const sendMessage = catchAsync(async (req, res) => {
  try{
    const secretKey = process.env.JWT_SECRET; // Use your JWT secret key from environment variables
    const userId = getUserIdFromToken(req.headers.authorization, secretKey);
    
    const message = await messageService.createMessage({
      ...req.body,
      sender_id: userId,
    });
    res.status(201).json({ success: true, data: message });
  }catch(error){
    res.status(401).json({ success: false, message: error.message });
  }
});

// Controller to get messages
export const getMessages = catchAsync(async (req, res) => {
  try {
    // Extract the token and parse the user ID
    const secretKey = process.env.JWT_SECRET; // Use your JWT secret key from environment variables
    const userId = getUserIdFromToken(req.headers.authorization, secretKey);

    // Fetch messages for the user
    const messages = await messageService.getMessagesByUser(userId);

    // Respond with the messages
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    // Handle errors (e.g., invalid token)
    res.status(401).json({ success: false, message: error.message });
  }
});

export const getEventMessages = catchAsync(async (req, res) => {
  const messages = await messageService.getMessagesByEvent(req.params.eventId);
  res.status(200).json({ success: true, data: messages });
});

// Update message status restricted to the sender of the message
export const updateMessageStatus = catchAsync(async (req, res) => {
  const message = await messageService.getMessageById(req.params.messageId);

  if (!message || message.sender_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this message",
    });
  }

  const updatedMessage = await messageService.updateMessageStatus(req.params.messageId, req.body.isRead);

  res.status(200).json({
    success: true,
    message: "Message status updated successfully",
    data: updatedMessage,
  });
});

// Delete message restricted to the sender of the message
export const deleteMessage = catchAsync(async (req, res) => {
  const message = await messageService.getMessageById(req.params.messageId);

  if (!message || message.sender_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this message",
    });
  }

  await messageService.deleteMessage(req.params.messageId);

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});
