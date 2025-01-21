// import express from "express";
// import * as userController from "../controllers/userController.js";
// import { protect } from "../middlewares/auth.js";

// const router = express.Router();

// router.post("/register", userController.registerUser);
// router.post("/login", userController.loginUser);
// router.get("/profile", protect, userController.getUserProfile);
// router.put("/profile", protect, userController.updateUserProfile);

// export default router;


// new file

import express from "express";
import * as userController from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js"; // Middleware to protect routes

const router = express.Router();

// Public routes
router.post("/register", userController.registerUser); // Registration
router.post("/login", userController.loginUser);       // Login

// Protected routes
router.get("/profile", protect, userController.getUserProfile); // Get user profile
router.put("/profile", protect, userController.updateUserProfile); // Update user profile

export default router;
