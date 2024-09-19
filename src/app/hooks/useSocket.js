// app/hooks/useSocket.js
'use client'
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

export default function useSocket() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket = io(); // Connect to the Socket.IO server

    socket.on('message', (msg) => {
      setMessage(msg); // Listen for incoming messages
    });

    return () => {
      socket.disconnect(); // Clean up when the component unmounts
    };
  }, []);

  const sendMessage = (msg) => {
    socket.emit('message', msg); // Send a message to the server
  };

  return { message, sendMessage };
}