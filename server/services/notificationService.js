import prisma from "../lib/prisma.js";

export const createNotification = async (notificationData) => {
  return await prisma.notification.create({ data: notificationData });
};

export const getNotificationsByUser = async (userId) => {
  userId = parseInt(userId, 10);
  return await prisma.notification.findMany({ where: { user_id: userId } });
};

export const updateNotificationStatus = async (notificationId, status) => {
  notificationId = parseInt(notificationId, 10);
  return await prisma.notification.update({
    where: { notification_id: notificationId },
    data: { isRead: status },
  });
};

export const deleteNotification = async (notificationId) => {
  notificationId = parseInt(notificationId, 10);
  return await prisma.notification.delete({ where: { notification_id: notificationId } });
};
