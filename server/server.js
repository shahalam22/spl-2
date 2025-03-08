// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import userRoutes from "./routes/userRoutes.js";
// import postRoutes from "./routes/postRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
// import bidRoutes from "./routes/bidRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import transactionRoutes from "./routes/transactionRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import errorHandler from "./middlewares/error.js";
// import bodyParser from "body-parser";
// import stripeRoutes from "./routes/stripeRoutes.js";
// import * as stripeController from "./controllers/stripeController.js";

// dotenv.config();
// const app = express();


// // Add this before other routes in server.js
// app.post(
//   "/api/stripe/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   stripeController.handleWebhook
// );


// // Enable CORS for localhost:3000
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow requests from your Next.js frontend
//   credentials: true, // Allow cookies, authorization headers, etc., if needed
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/events", eventRoutes);
// app.use("/api/bids", bidRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/stripe", stripeRoutes);

// // Error handling middleware
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });










// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";

// Import your routes and controllers as before
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import * as stripeController from "./controllers/stripeController.js";
import errorHandler from "./middlewares/error.js";

dotenv.config();
const app = express();

// Stripe webhook (must be before body parsing middleware)
app.post(
  "/api/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripeController.handleWebhook
);

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your Next.js frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// REST routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stripe", stripeRoutes);

// Error handling middleware
app.use(errorHandler);

// Create HTTP server and Socket.IO instance
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React client URL
    methods: ["GET", "POST"],
  },
});

// A map to keep track of online users: userId -> socket.id
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // When the client joins, it should send its userId to join the "room"
  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} joined with socket id ${socket.id}`);
  });

  // When a message is sent from the client
  socket.on("sendMessage", (data) => {
    // Data should include: { sender_id, receiver_id, message, createdAt }
    // Save the message to the database using your service.
    // (You could also call your REST API endpoint here if preferred.)
    import("./services/messageService.js").then(({ createMessage }) => {
      createMessage(data)
        .then((savedMessage) => {
          // Emit the saved message to the receiver if they are online
          const receiverSocketId = onlineUsers.get(data.receiver_id);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", savedMessage);
          }
          // Optionally, notify the sender that the message was sent successfully
          socket.emit("messageSent", savedMessage);
        })
        .catch((error) => {
          console.error("Error saving message:", error);
          socket.emit("errorMessage", { error: error.message });
        });
    });
  });

  socket.on("joinEvent", ({ eventId, userId }) => {
    socket.join(`event_${eventId}`);
    console.log(`User ${userId} joined event room ${eventId}`);
  });

  // When a new bid is placed, create a bid record and update the product's bidAmount
  socket.on("newBid", async (data) => {
    // Data should include: bidAmount, user_id, event_id, post_id, status
    try {
      const { createBid } = await import("./services/bidService.js");
      // Create a new bid record
      const newBid = await createBid(data);
      
      // Update the product (post) with the new bidAmount
      const { default: prisma } = await import("./lib/prisma.js");
      const updatedPost = await prisma.post.update({
        where: { post_id: data.post_id },
        data: { bidAmount: data.bidAmount },
      });
      
      // Broadcast the updated product to all sockets in the event room
      console.log(updatedPost);
      
      io.to(`event_${data.event_id}`).emit("bidAmountUpdated", updatedPost);
    } catch (error) {
      console.error("Error processing new bid:", error);
      socket.emit("bidError", { error: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected: " + socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
