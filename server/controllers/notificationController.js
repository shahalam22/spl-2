import * as notificationService from "../services/notificationService.js";
import catchAsync from "../utils/catchAsync.js";

export const createNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.createNotification({
    ...req.body,
    user_id: req.user.user_id,
  });
  res.status(201).json({ success: true, data: notification });
});

export const getNotifications = catchAsync(async (req, res) => {
  const notifications = await notificationService.getNotificationsByUser(req.user.user_id);
  res.status(200).json({ success: true, data: notifications });
});

export const markNotificationAsRead = catchAsync(async (req, res) => {
  const notification = await notificationService.updateNotificationStatus(req.params.id, true);
  res.status(200).json({ success: true, data: notification });
});

export const deleteNotification = catchAsync(async (req, res) => {
  await notificationService.deleteNotification(req.params.id);
  res.status(204).json({ success: true });
});
