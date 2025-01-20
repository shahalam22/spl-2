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
  return await prisma.message.findMany({ where: { receiver_id: eventId } });
};

export const updateMessageStatus = async (messageId, status) => {
  return await prisma.message.update({
    where: { message_id: messageId },
    data: { isRead: status },
  });
};
