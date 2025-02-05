class Post {
    constructor(post_id, title, description, price, isRequest, status, user_id, category_id, event_id = null, createdAt, updatedAt) {
      this.post_id = post_id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.isRequest = isRequest;
      this.status = status; // "available", "sold", or "bidding"
      this.user_id = user_id;
      this.category_id = category_id;
      this.event_id = event_id;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  
    // update post details
    updateDetails({ title, description, price }) {
      if (title) this.title = title;
      if (description) this.description = description;
      if (price) this.price = price;
      this.updatedAt = new Date();
    }
  
    // mark post as sold
    markAsSold() {
      this.status = "sold";
      this.updatedAt = new Date();
    }
  
    // associate post with an event
    associateWithEvent(event_id) {
      this.event_id = event_id;
      this.updatedAt = new Date();
    }
}

export default Post;