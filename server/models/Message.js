class Message {
    constructor(message_id, content, isRead = false, sender_id, receiver_id, createdAt) {
      this.message_id = message_id;
      this.content = content;
      this.isRead = isRead;
      this.sender_id = sender_id;
      this.receiver_id = receiver_id;
      this.createdAt = createdAt;
    }
  
    // Method to mark the message as read
    markAsRead() {
      this.isRead = true;
    }
}

export default Message;