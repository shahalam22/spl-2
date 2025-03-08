import { createServer } from 'http';
import { Server } from 'socket.io';

// Create an HTTP server for Socket.IO
const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust to your frontend URL
    methods: ["GET", "POST"],
  },
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('New client connected');

  // Client joins an event-specific room
  socket.on('joinEvent', (eventId) => {
    socket.join(eventId);
    console.log(`Client joined event room ${eventId}`);
  });

  // Log disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the WebSocket server on a unique port
const WS_PORT = 5002; // Use a different port from your main server
server.listen(WS_PORT, () => {
  console.log(`WebSocket server running on port ${WS_PORT}`);
});

// Export io for use in other modules
export { io };