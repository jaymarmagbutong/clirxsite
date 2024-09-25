'use client';
import React, { useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa";

const PageUserItem = ({ user, page_id, users_id }) => {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (typeof users_id !== 'undefined') {
            // Check if the current user's ID exists in the users_id array
            const hasUserId = users_id.some(item => item.user_id === user.id);
            setStatus(hasUserId);
        }
    }, [users_id, user.id]); // Dependency array to run this effect when users_id or user.id changes

    const sendAccreditation = async () => {
        const data = {
            user_id: user.id,
            page_id: page_id,
        };

        try {
            const response = await fetch('/api/appt/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create Accreditation');
            }

            const results = await response.json();
            console.log('Post Created Successfully', results);
            setStatus(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div key={user.id} className="flex items-center justify-between border-b py-2">
            <div className="flex items-center space-x-4">
                <div>
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                    <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
            </div>

            {status ? (
                <button className="text-white px-3 py-1 rounded bg-green-500 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed" disabled>
                    <FaCheck/>
                </button>
            ) : (
                <button className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm" onClick={sendAccreditation}>
                  Send
                </button>
            )}
        </div>
    );
};

export default PageUserItem;
