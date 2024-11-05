const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


  const server = createServer((req, res) => {
    handle(req, res);
  });

  // Enable CORS for Socket.IO
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Specify the origin(s) allowed to connect
      methods: ["GET", "POST"],        // Specify the allowed methods
      credentials: true                // Enable cookies and headers sent by the client
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('message', (data) => {
      console.log('Message received:', data);
      socket.broadcast.emit('message', data); // Broadcasting to all other clients
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  const PORT = process.env.PORT || 8080;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Server running on http://localhost:${PORT}`);
  });
