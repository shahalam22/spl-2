class User {
    constructor(user_id, username, email, hashedPassword, profilePicture = null, lastLogin = null, createdAt) {
      this.user_id = user_id;
      this.username = username;
      this.email = email;
      this.hashedPassword = hashedPassword;
      this.profilePicture = profilePicture;
      this.lastLogin = lastLogin;
      this.createdAt = createdAt;
    }
  
    // Method to verify password (placeholder for hashed password comparison)
    verifyPassword(inputPassword) {
      return this.hashedPassword === inputPassword; // Replace with a proper hash comparison in production
    }
  
    // Method to update profile
    updateProfile({ username, email, profilePicture }) {
      if (username) this.username = username;
      if (email) this.email = email;
      if (profilePicture) this.profilePicture = profilePicture;
    }
  
    // Method to update last login
    updateLastLogin() {
      this.lastLogin = new Date();
    }
}

export default User;