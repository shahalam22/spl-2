// new file

import * as userService from "../services/userService.js";
import catchAsync from "../utils/catchAsync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = catchAsync(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // console.log(
  //   username,
  //   email,
  //   password,
  //   confirmPassword
  // );

  // Check if the username or email already exists
  const existingUserByEmail = await userService.getUserByEmail(email);
  if (existingUserByEmail) {
    return res.status(400).json({ success: false, message: "Email already in use" });
  }

  const existingUserByUsername = await userService.getUserByUsername(username);
  if (existingUserByUsername) {
    return res.status(400).json({ success: false, message: "Username already in use" });
  }

  if(password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  // Create the user
  const newUser = await userService.createUser({ username, email, password});

  // Generate a JWT token
  const token = jwt.sign({ id: newUser.user_id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Update last login
  await userService.updateUser(newUser.user_id, { lastLogin: new Date() });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { token, user_id: newUser.user_id, username: newUser.username, email: newUser.email },
  });
});

// Login a user
export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // console.log(email, password);
  
  
  // Find the user by email
  const user = await userService.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Update last login
  await userService.updateUser(user.user_id, { lastLogin: new Date() });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { token, user_id: user.user_id, username: user.username, email: user.email },
  });
});

// Get the logged-in user's profile
export const getUserProfile = catchAsync(async (req, res) => {
  // console.log(req.user);
  
  const user = await userService.getUserById(req.user.user_id);
  
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    data: {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      lastLogin: user.lastLogin,
    },
  });
});

// Update the logged-in user's profile
export const updateUserProfile = catchAsync(async (req, res) => {
  const { username, email, profilePicture } = req.body;

  const updatedUser = await userService.updateUser(req.user.user_id, { username, email, profilePicture });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: { user_id: updatedUser.user_id, username: updatedUser.username, email: updatedUser.email },
  });
});
