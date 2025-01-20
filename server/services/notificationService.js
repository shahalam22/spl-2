import prisma from "../lib/prisma.js";

export const createNotification = async (notificationData) => {
  return await prisma.notification.create({ data: notificationData });
};

export const getNotificationsByUser = async (userId) => {
  return await prisma.notification.findMany({ where: { user_id: userId } });
};

export const updateNotificationStatus = async (notificationId, status) => {
  return await prisma.notification.update({
    where: { notification_id: notificationId },
    data: { isRead: status },
  });
};

export const deleteNotification = async (notificationId) => {
  return await prisma.notification.delete({ where: { notification_id: notificationId } });
};
