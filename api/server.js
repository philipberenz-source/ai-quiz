//import all modules 
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { PrismaClient } from './generated/prisma/index.js';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import retrieveQuestions from './routes/retrieveQuestions.js';
import retrieveCategories from './routes/retrieveCategories.js';
import webhook from "./routes/webhook.js";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
//defining important variables
const app = express();
const prisma = new PrismaClient();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const port = process.env.PORT || 8080;


//include all routes and middleware 
app.use(clerkMiddleware({ publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY }));
app.use(cors({ origin: '*' }));
app.use("/retrievequestions", retrieveQuestions);
app.use("/retrievecategories", retrieveCategories);
app.use("/api/webhooks", webhook); 

// --- SOCKET.IO: active socket tracking ---
/**
 * Store active sockets as Map<socketId, { socketId, userId, username }>
 * The client should provide { userId, username } in socket.handshake.auth
 */
const activeSockets = new Map();

const getActiveUsers = () => Array.from(activeSockets.values());

// Simple auth middleware for sockets: expect userId (and optional username) in handshake auth.
io.use((socket, next) => {
  const { userId, username } = socket.handshake.auth || {};
  if (!userId) {
    return next(new Error('Authentication error: userId required in handshake auth'));
  }
  socket.data.userId = userId;
  socket.data.username = username || 'unknown';
  next();
});

io.on('connection', (socket) => {
  const { userId, username } = socket.data;
  activeSockets.set(socket.id, { socketId: socket.id, userId, username, status : "online" });

  console.log(`Socket connected: ${socket.id} userId=${userId} username=${username}`);

  // broadcast current active users
  io.emit('active-users', getActiveUsers());

  socket.on('disconnect', (reason) => {
    activeSockets.delete(socket.id);
    console.log(`Socket disconnected: ${socket.id} reason=${reason}`);
    io.emit('active-users', getActiveUsers());
  });
  //invite logic
  socket.on('invite', (id) => {
    socket.to(id).emit("invite")
  })
});

//run server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});