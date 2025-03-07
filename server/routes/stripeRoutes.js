// routes/stripeRoutes.js
import express from "express";
import { protect } from "../middlewares/auth.js";
import * as stripeController from "../controllers/stripeController.js";

const router = express.Router();

router.post("/create-checkout-session", protect, stripeController.createCheckoutSession);

export default router;