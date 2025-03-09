import prisma from "../lib/prisma.js";

export const createMessage = async (messageData) => {
  return await prisma.message.create({ data: messageData });
};

export const getMessagesByUser = async (userId) => {
  return await prisma.message.findMany({
    where: {
      OR: [{ sender_id: userId }, { receiver_id: userId }],
    },
  });
};

export const getMessagesByEvent = async (eventId) => {
  eventId = parseInt(eventId, 10);
  return await prisma.message.findMany({ where: { receiver_id: eventId } });
};

export const updateMessageStatus = async (messageId, status) => {
  messageId = parseInt(messageId, 10);
  return await prisma.message.update({
    where: { message_id: messageId },
    data: { isRead: status },
  });
};

export const deleteMessage = async (messageId) => {
  messageId = parseInt(messageId, 10);
  return await prisma.message.delete({ where: { message_id: messageId } });
};


export const getMessagesByUsers = async (userId, anotherUserId) => {
  userId = parseInt(userId, 10);
  anotherUserId = parseInt(anotherUserId, 10);

  return await prisma.message.findMany({
    where: {
      OR: [
        { sender_id: userId, receiver_id: anotherUserId },
        { sender_id: anotherUserId, receiver_id: userId },
      ],
    },
  });
}


export const getChatUsers = async (userId) => {
  userId = parseInt(userId, 10);

  return await prisma.message.findMany({
    where: {
      OR: [{ sender_id: userId }, { receiver_id: userId }],
      select: {
        sender_id: true,
        receiver_id: true,
      },
    },
  });
}