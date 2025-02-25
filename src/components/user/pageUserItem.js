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
        <div key={user.id} className="flex items-start  justify-between border-b py-2">
            <div className="flex items-center space-x-4">
                <div>
                    <div className="text-sm font-medium text-clirxColor">{user.username}</div>
                    <div className="text-xs font-thin text-gray-400 max-w-[150px] truncate">{user.email}</div>
                </div>
            </div>

            {status ? (
                <button className="text-white px-2 py-0 text-sm rounded bg-green-500 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed" disabled>
                   Allowed
                </button>
            ) : (
                <button className="text-white bg-clirxColor hover:bg-clirxLightColor px-2 py-0 rounded text-sm" onClick={sendAccreditation}>
                  Allow
                </button>
            )}
        </div>
    );
};

export default PageUserItem;
