import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import errorHandler from "./middlewares/error.js";

dotenv.config();

const app = express();

app.use(express.json());
+

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
