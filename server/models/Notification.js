class Notification {
    constructor(notification_id, title, content, isRead = false, user_id, createdAt) {
      this.notification_id = notification_id;
      this.title = title;
      this.content = content;
      this.isRead = isRead;
      this.user_id = user_id;
      this.createdAt = createdAt;
    }
  
    // Method to mark notification as read
    markAsRead() {
      this.isRead = true;
    }
}

export default Notification;