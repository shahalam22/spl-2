class Bid {
    constructor(bid_id, bidAmount, status, user_id, event_id, product_id, createdAt) {
      this.bid_id = bid_id;
      this.bidAmount = bidAmount;
      this.status = status; // e.g., "active", "accepted", "rejected"
      this.user_id = user_id;
      this.event_id = event_id;
      this.product_id = product_id;
      this.createdAt = createdAt;
    }
  
    // Method to update bid amount
    updateBidAmount(amount) {
      this.bidAmount = amount;
    }
  
    // Method to update bid status
    updateStatus(status) {
      this.status = status;
    }
}

export default Bid;