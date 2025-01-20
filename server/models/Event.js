class Event {
    constructor(event_id, title, description, status, startTime, endTime, user_id, createdAt) {
      this.event_id = event_id;
      this.title = title;
      this.description = description;
      this.status = status; // "upcoming", "ongoing", or "ended"
      this.startTime = startTime;
      this.endTime = endTime;
      this.user_id = user_id;
      this.createdAt = createdAt;
    }
  
    // Method to check if the event is active
    isActive() {
      const now = new Date();
      return now >= this.startTime && now <= this.endTime && this.status === "ongoing";
    }
  
    // Method to update event details
    updateDetails({ title, description, startTime, endTime, status }) {
      if (title) this.title = title;
      if (description) this.description = description;
      if (startTime) this.startTime = startTime;
      if (endTime) this.endTime = endTime;
      if (status) this.status = status;
    }
}

export default Event;