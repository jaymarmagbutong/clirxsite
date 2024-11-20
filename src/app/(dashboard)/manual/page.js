'use client'
import React, { useState, useEffect } from 'react';
import { useSocket } from '@/app/context/SocketContext';

const page = () => {

	const socket = useSocket();

	useEffect(() => {
        if (!socket) return;
    
        // Set up the message listener
        socket.on('message', (message) => {
          console.log('Message from serverdds:', message);
          // Here, you could update notifications or handle any other real-time updates
        });
    
        // Clean up the listener on component unmount
        return () => {
          socket.off('message');
        };
      }, [socket]);


  return (
    <div>
        Manual Page
    </div>
  )
}

export default page