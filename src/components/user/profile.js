"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import Image from "next/image";

const ProfileComponent = ({ profileData }) => {
    const user = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "+09123205738",
        address: "525 E 68th Street, New York, NY",
        birthday: "June 5, 1992",
        gender: "Male",
    });

    useEffect(() => {
        if (user.userData) {
            setUserData(prev => ({
                ...prev,
                name: user.userData.user?.name || "",
                email: user.userData.user?.email || "",
            }));
        }
    }, [user.userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const updatedData = {
            ...userData,
            user: {
                ...userData.user,
                name,
                email,
                phone,
                address,
                birthday,
                gender,
            },
        };

        try {
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            
            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const result = await response.json();
            setUserData(result);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
    
    return (
        <div>
            {/* Profile Header */}
            <div className="flex items-center mb-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-clirxColor">
                    <Image src="/img/profile.png" alt="Profile Picture" layout="fill" objectFit="cover" />
                </div>
                <div className="ml-6">
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            className="text-2xl font-semibold text-gray-800 border rounded-md p-1"
                        />
                    ) : (
                        <h1 className="text-2xl font-semibold text-gray-800">{userData.name}</h1>
                    )}
                    <p className="text-clirxColor">Web Developer</p>
                    <p className="text-gray-500">New York, NY</p>
                </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
                <span className="text-xl font-bold text-gray-800">8.6</span>
                <div className="ml-2 text-yellow-400">{"★".repeat(4)}{"☆".repeat(1)}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
                <button className="px-4 py-2 bg-clirxColor text-white rounded-md shadow-md hover:bg-clirxLightColor">
                    Send Message
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md shadow-md hover:bg-gray-200">
                    Contacts
                </button>
                <button
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    className={`px-4 py-2 rounded-md shadow-md text-white ${
                        isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {isEditing ? "Save" : "Edit"}
                </button>
            </div>

            {/* Contact Information */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Information</h2>
                <ul className="space-y-2">
                    {['phone', 'address', 'email'].map((field) => (
                        <li key={field}>
                            <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{" "}
                            {isEditing ? (
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    value={userData[field]}
                                    onChange={handleChange}
                                    className="border rounded-md p-1"
                                />
                            ) : field === "email" ? (
                                <a href={`mailto:${userData[field]}`} className="text-blue-500">
                                    {userData[field]}
                                </a>
                            ) : (
                                <span className="text-gray-600">{userData[field]}</span>
                            )}
                        </li>
                    ))}
                    <li>
                        <strong>Site:</strong>{" "}
                        <a href="https://www.jaymar.com" className="text-blue-500">www.jaymar.com</a>
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
                                name="birthday"
                                value={userData.birthday}
                                onChange={handleChange}
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <span className="text-gray-600">{userData.birthday}</span>
                        )}
                    </li>
                    <li>
                        <strong>Gender:</strong>{" "}
                        {isEditing ? (
                            <select
                                name="gender"
                                value={userData.gender}
                                onChange={handleChange}
                                className="border rounded-md p-1"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : (
                            <span className="text-gray-600">{userData.gender}</span>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileComponent;