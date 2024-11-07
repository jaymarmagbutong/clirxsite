"use client"
// context/SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSocket } from '@/app/libs/socket';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    // Optional: Log when connected
    socketInstance.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
