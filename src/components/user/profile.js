"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import Image from "next/image";

const ProfileComponent = ({ profileData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const user = useUser(); // Get user_id from the context

    useEffect(() => {
        if (user.userData) {
            setUserData(user.userData);
            setName(user.userData.user?.name || "");
            setEmail(user.userData.user?.email || "");
            setPhone("+09123205738"); // Default phone number
            setAddress("525 E 68th Street, New York, NY"); // Default address
            setBirthday("June 5, 1992"); // Default birthday
            setGender("Male"); // Default gender
        }
    }, [user.userData]);

    const handleSave = () => {
        // Save the updated data (you can send it to an API or update the context)
        const updatedData = {
            ...userData,
            user: {
                ...userData.user,
                name,
                email,
            },
        };
        setUserData(updatedData);
        setIsEditing(false); // Exit edit mode
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center mb-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-clirxColor">
                    <Image src="/img/profile.png" alt="Profile Picture" layout="fill" objectFit="cover" />
                </div>
                <div className="ml-6">
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-2xl font-semibold text-gray-800 border rounded-md p-1"
                        />
                    ) : (
                        <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
                    )}
                    <p className="text-clirxColor">Web Developer</p>
                    <p className="text-gray-500">New York, NY</p>
                </div>
            </div>

            {/* Rankings */}
            <div className="flex items-center mb-6">
                <span className="text-xl font-bold text-gray-800">8.6</span>
                <div className="ml-2 text-yellow-400">
                    {/* Render stars dynamically if needed */}
                    {"\u2605".repeat(4)}
                    {"\u2606".repeat(1)}
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
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                    >
                        Edit
                    </button>
                )}
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
                        <strong>Phone:</strong>{" "}
                        {isEditing ? (
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <span className="text-gray-600">{phone}</span>
                        )}
                    </li>
                    <li>
                        <strong>Address:</strong>{" "}
                        {isEditing ? (
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <span className="text-gray-600">{address}</span>
                        )}
                    </li>
                    <li>
                        <strong>Email:</strong>{" "}
                        {isEditing ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <a href={`mailto:${email}`} className="text-blue-500">
                                {email}
                            </a>
                        )}
                    </li>
                    <li>
                        <strong>Site:</strong>{" "}
                        <a href="https://www.jaymar.com" className="text-blue-500">
                            www.jaymar.com
                        </a>
                    </li>
                </ul>
            </div>

            {/* Basic Information */}
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Basic Information</h2>
                <ul className="space-y-2">
                    <li>
                        <strong>Birthday:</strong>{" "}
                        {isEditing ? (
                            <input
                                type="text"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <span className="text-gray-600">{birthday}</span>
                        )}
                    </li>
                    <li>
                        <strong>Gender:</strong>{" "}
                        {isEditing ? (
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="border rounded-md p-1"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : (
                            <span className="text-gray-600">{gender}</span>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileComponent;