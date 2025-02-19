'use client';
import React, { useEffect, useState } from 'react';
import ProfileComponent from "@/components/user/profile";
import { useUser } from "@/app/context/UserContext";
import toast from 'react-hot-toast';

export default function Page() {
    const user = useUser(); // Use the hook inside the component body
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/users/get/details');
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    toast.error('Failed to load user data!');
                }
            } catch (error) {
                toast.error('Error occurred while fetching user details!');
            }
        };

        if (user.userData) {
            fetchUserData();
        }
    }, [user.userData]);

    return (
        <div className="mx-auto bg-white rounded-md shadow-sm p-8">
            {/* Pass `userData` to the ProfileComponent if needed */}
            <ProfileComponent profileData={userData} />
        </div>
    );
}
