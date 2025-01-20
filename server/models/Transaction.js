class Transaction {
    constructor(transaction_id, amount, method, status, post_id, user_id, createdAt) {
      this.transaction_id = transaction_id;
      this.amount = amount;
      this.method = method; // e.g., "credit card", "paypal", etc.
      this.status = status; // e.g., "pending", "completed", "failed"
      this.post_id = post_id;
      this.user_id = user_id;
      this.createdAt = createdAt;
    }
  
    // Method to update transaction status
    updateStatus(status) {
      this.status = status;
    }
}

export default Transaction;