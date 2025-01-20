import * as userService from "../services/userService.js";
import catchAsync from "../utils/catchAsync.js";

export const registerUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);
  if (!user || user.hashedPassword !== password) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  res.status(200).json({ success: true, data: user });
});

export const getUserProfile = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.user_id);
  res.status(200).json({ success: true, data: user });
});

export const updateUserProfile = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.user.user_id, req.body);
  res.status(200).json({ success: true, data: user });
});
