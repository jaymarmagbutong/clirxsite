'use client';
import React, { useState, useEffect, useRef, useCallback, use } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useSocket } from '@/app/context/SocketContext';
import Link from 'next/link';


function  NotificationAdmin ({ userInfo }) {

    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const socket = useSocket();
    const [notification, setNotification] = useState({
        data: [],
        unread_count: 0
    });

    console.log(notification);
 
    const fetchNotification = useCallback(async (pageNumber = 1) => {
        if (!userInfo || !hasMore) return;
        
        try {
            setLoading(true);
            const response = await fetch(
                `/api/notification/get/${userInfo?.user?.id}?page=${pageNumber}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        role: userInfo?.user?.role,
                        id: userInfo?.user?.id,
                    },
                }
            );

            if (!response.ok) throw new Error('Failed to fetch notifications');
            
            const { data, unread_count } = await response.json();

            setNotification(prev => ({
                data: pageNumber === 1 ? data : [...prev.data, ...data],
                unread_count: unread_count
            }));

            setHasMore(data.length === 5); // Assuming limit is 5
            setPage(pageNumber);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    }, [userInfo, hasMore]);

    // Initial load and socket updates
    useEffect(() => {
        fetchNotification(1);
    }, [fetchNotification]);

    useEffect(() => {
        if (!socket) return;

        const handleNewNotification = () => {
            // Refresh notifications and reset pagination
            setPage(1);
            fetchNotification(1);
        };

        socket.on('new-notification', handleNewNotification);
        return () => socket.off('new-notification', handleNewNotification);
    }, [socket, fetchNotification]);

    // Scroll handler
    const handleScroll = useCallback((e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight * 1.2 && !loading && hasMore) {
            fetchNotification(page + 1);
        }
    }, [loading, hasMore, page, fetchNotification]);

    // Mark as read
    const markNotificationAsRead = async (id) => {
        try {
            await fetch(`/api/notification/mark-as-read/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    notificationId: id,
                    userId: userInfo?.user?.id 
                }),
            });

            setNotification(prev => ({
                ...prev,
                data: prev.data.map(n => 
                    n.id === id ? { ...n, is_read: 1 } : n
                ),
                unread_count: Math.max(prev.unread_count - 1, 0)
            }));
        } catch (error) {
            console.error('Mark read error:', error);
        }
    };

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
                !e.target.closest('.notification-icon')) {
                setNotificationDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='relative'>
            <div
                className='notification-icon bg-white relative rounded-full w-8 h-8 flex items-center justify-center cursor-pointer border'
                onClick={() => setNotificationDropdown(!notificationDropdown)}
            >
                <IoMdNotificationsOutline size={25} />
                {notification.unread_count > 0 && (
                    <span className='absolute -top-2 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-white bg-red-700 text-xs'>
                        {notification.unread_count}
                    </span>
                )}
            </div>

            {notificationDropdown && (
                <div
                    ref={dropdownRef}
                    className='absolute right-0 mt-4 w-80 bg-white rounded-lg shadow-lg z-50'
                >
                    <h2 className='font-semibold mb-4 px-4'>Notifications</h2>
                    <div 
                        className='divide-y max-h-80 overflow-y-auto scrollbar-thin'
                        onScroll={handleScroll}
                    >
                        {notification.data.map((notif) => (
                           
                           <div
                         
                                key={notif.id}
                                onClick={() => !notif.is_read && markNotificationAsRead(notif.id)}
                                className={`flex items-center justify-between p-4 space-x-3 py-3 ${notif.id} ${
                                    notif.is_read ? 'bg-white opacity-70' : 'bg-gray-100'
                                }`}
                            >
                                <div className='w-10 h-10 rounded-full bg-gray-200'></div>
                                 
                                <div className='text-sm w-60 text-gray-700'>
                                    {userInfo?.user.role == 1 || userInfo?.user.role == 2  ? (
                                        notif.action_type == 'delete-page' ? (
                                        <>
                                            <div dangerouslySetInnerHTML={{ __html: notif.action }}></div>
                                            <p className='text-xs text-gray-500'>{notif.time}</p>
                                        </>
                                        ) : (
                                        <Link key={notif.item}  href={`/manual/contents/page/${notif.page_id}`}>
                                            <div dangerouslySetInnerHTML={{ __html: notif.action }}></div>
                                            <p className='text-xs text-gray-500'>{notif.time}</p>
                                        </Link>
                                        )
                                    ) : (
                                        <Link key={notif.item}  href={`/appt-interaction/page/${notif.page_id}`}>
                                        <div dangerouslySetInnerHTML={{ __html: notif.action }}></div>
                                        <p className='text-xs text-gray-500'>{notif.time}</p>
                                        </Link>
                                    )}
                                </div>

                               
                            </div>
                           
                        ))}
                        {loading && (
                            <div className="flex justify-center p-4">
                                <span className="loading loading-spinner text-primary"></span>
                            </div>
                        )}
                        {!hasMore && (
                            <div className="text-center p-4 text-sm text-gray-500">
                                No more notifications
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationAdmin;