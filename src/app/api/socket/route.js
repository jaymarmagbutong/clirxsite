import { Server } from 'socket.io';

export const runtime = 'edge'; // Using Edge runtime for lower latency (optional)

export default async function handler(req) {
  if (!req.socket.server.io) {
    console.log('Initializing Socket.IO');
    const io = new Server(req.socket.server);
    req.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Handle client messages
      socket.on('message', (msg) => {
        console.log('Message received:', msg);
        io.emit('message', msg); // Broadcast the message to all clients
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  return new Response('Socket.IO is running');
}