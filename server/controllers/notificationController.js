import * as notificationService from "../services/notificationService.js";
import catchAsync from "../utils/catchAsync.js";

export const createNotification = catchAsync(async (req, res) => {
  console.log(req.body);
  
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

// Mark notification as read restricted to the owner of the notification
export const markNotificationAsRead = catchAsync(async (req, res) => {
  const notification = await notificationService.getNotificationById(req.params.id);

  if (!notification || notification.user_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to mark this notification as read",
    });
  }

  const updatedNotification = await notificationService.updateNotificationStatus(req.params.id, true);

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    data: updatedNotification,
  });
});

// Delete notification restricted to the owner of the notification
export const deleteNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.getNotificationById(req.params.id);

  if (!notification || notification.user_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this notification",
    });
  }

  await notificationService.deleteNotification(req.params.id);

  res.status(200).json({
    success: true,
    message: "Notification deleted successfully",
  });
});

