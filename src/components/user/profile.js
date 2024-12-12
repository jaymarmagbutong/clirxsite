"use client"
import React, {useEffect, useState} from 'react'
import { useUser } from "@/app/context/UserContext";
import Image from 'next/image';

const ProfileComponent = ({profileData}) => {


    
    const user = useUser(); // Get user_id from the context

    const [userData, setUserData] = useState([]); 
    useEffect(()=>{
        setUserData(user.userData)
    }, [profileData])


    console.log(userData)

    return (
        <div>
            {/* Header */}
            <div className="flex items-center mb-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-clirxColor">
                    <Image src="/img/profile.png" alt="Profile Picture" layout="fill" objectFit="cover" />
                </div>
                <div className="ml-6">
                    <h1 className="text-2xl font-semibold text-gray-800">{userData.user.name}</h1>
                    <p className="text-clirxColor">Web Developer</p>
                    <p className="text-gray-500">New York, NY</p>
                </div>
            </div>

            {/* Rankings */}
            <div className="flex items-center mb-6">
                <span className="text-xl font-bold text-gray-800">8.6</span>
                <div className="ml-2 text-yellow-400">
                    {/* Render stars dynamically if needed */}
                    {'\u2605'.repeat(4)}{'\u2606'.repeat(1)}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mb-8">
                <button className="px-4 py-2 bg-clirxColor text-white rounded-md shadow-md hover:bg-clirxLightColor">
                    Send Message
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md shadow-md hover:bg-gray-200">
                    Contacts
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b mb-6">
                <nav className="flex space-x-4">
                    <a href="#" className="pb-2 border-b-2 border-clirxColor text-clirxColor">
                        About
                    </a>
                </nav>
            </div>

            {/* Contact Information */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Information</h2>
                <ul className="space-y-2">
                    <li>
                        <strong>Phone:</strong> <span className="text-gray-600">+09123205738</span>
                    </li>
                    <li>
                        <strong>Address:</strong> <span className="text-gray-600">525 E 68th Street, New York, NY</span>
                    </li>
                    <li>
                        <strong>Email:</strong> <a href={`mailto:${userData.user.email}`} className="text-blue-500">{userData.user.email}</a>
                    </li>
                    <li>
                        <strong>Site:</strong> <a href="https://www.jeremyrose.com" className="text-blue-500">www.jaymar.com</a>
                    </li>
                </ul>
            </div>

            {/* Basic Information */}
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Basic Information</h2>
                <ul className="space-y-2">
                    <li>
                        <strong>Birthday:</strong> <span className="text-gray-600">June 5, 1992</span>
                    </li>
                    <li>
                        <strong>Gender:</strong> <span className="text-gray-600">Male</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileComponent