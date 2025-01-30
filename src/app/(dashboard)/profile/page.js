'use client';
import React, { useEffect, useState } from 'react';
import ProfileComponent from "@/components/user/profile";
import { useUser } from "@/app/context/UserContext";

export default function Page() {
    const user = useUser(); // Use the hook inside the component body
    const [userData, setUserData] = useState(null);

    console.log('user');
    console.log(user.userData);
    console.log('user');
    useEffect(() => {

        const fetchUserData = async () => {

            try {
                // Fetch Page Details
                const response = await fetch(`/api/user/get/${user.id}`, {
                    next: { revalidate: 3600 },
                });
                const data = await response.json();
                setUserData(data); // Save user data in state
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };


        if(user.userData === !null){
            fetchUserData();
        }

    }, [user.userData, user.id]); // Re-run when `user` changes

    return (
        <div className="mx-auto bg-white rounded-md shadow-sm p-8">
            {/* Pass `userData` to the ProfileComponent if needed */}
            <ProfileComponent profileData={userData} />
        </div>
    );
}
