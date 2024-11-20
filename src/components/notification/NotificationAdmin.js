'use client'
import React, { useState, useEffect } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useSocket } from '@/app/context/SocketContext';


function NotificationAdmin() {
    const [notificationDropdown, setNotificationDropdown] = useState(false);

    const socket = useSocket();
    
    const notifications = [
        { id: 1, name: 'Jaymar Magbutong', action: 'clapped for', item: 'Really Awesome Article Name!', time: '11 hrs ago' },
        { id: 2, name: 'Jaymar Magbutong + 1 other', action: 'started following you', time: '11 hrs ago' },
        { id: 3, name: 'Dianne Grace', action: 'started following you', time: 'yesterday' },
        { id: 4, name: 'Dianne Grace + 1 other', action: 'clapped for', item: 'Really Awesome Article Name!', time: 'yesterday' },
    ];

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

    const socketTrigger = () => {
		setSocketAction(prevModalStatus => !prevModalStatus);
	}

    return (
        <div className='relative'>
            {/* Notification Icon */}
            <div 
                className='bg-white relative rounded-full w-8 h-8 flex items-center justify-center cursor-pointer border ' 
                onClick={() => setNotificationDropdown(!notificationDropdown)}
            >
                <IoMdNotificationsOutline size={25} />
                <span className='absolute -top-2 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-white bg-red-700 text-xs'>1</span>
            </div>

            {/* Notification Dropdown */}
            {notificationDropdown && (
                <div className='absolute right-0 mt-4 w-80 bg-white rounded-lg shadow-lg p-4 z-50'>
                    <h2 className='font-semibold mb-4'>Notifications</h2>
                    <div className='divide-y'>
                        {notifications.map((notification) => (
                            <div key={notification.id} className='flex items-center justify-between space-x-3 py-3'>
                                {/* Profile Picture Placeholder */}
                                <div className='w-10 h-10 rounded-full bg-gray-200'></div>
                                
                                <div className='text-sm w-60 text-gray-700'>
                                    <p>
                                        <span className='font-semibold'>{notification.name}</span>{' '}
                                        {notification.action}{' '}
                                        {notification.item && (
                                            <span className='font-semibold'>{notification.item}</span>
                                        )}
                                    </p>
                                    <p className='text-xs text-gray-500'>{notification.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationAdmin;
