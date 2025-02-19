"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import Image from "next/image";
import toast from 'react-hot-toast';
import { formatDate } from "../../../libs/dateUtils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import PlacesAutocomplete from 'react-places-autocomplete';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css' // Import the styles for the phone input


const ProfileComponent = ({ profileData }) => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [site, setSite] = useState("");
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [middle_name, setMiddleName] = useState("");
    const [lastname, setLastname] = useState("");

    useEffect(() => {

        if (profileData) {
            setUserData(profileData);
            setName(profileData?.username || "");
            setFirstname(profileData?.firstname || "");
            setMiddleName(profileData?.middle_name || "");
            setLastname(profileData?.lastname || "");
            setSite(profileData?.site || "");
            setEmail(profileData?.email || "");
            setPhone(profileData?.phone || ""); // Default phone number
            setAddress(profileData?.address || ""); // Default address
            setBirthday(profileData?.birthday || ""); // Default birthday
            setGender(profileData?.gender || ""); // Default gender
        }

    }, [profileData]);


     // Load the Google Maps script dynamically when the component mounts
     useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzPUxKkvhI8Y3_VmsdGkFf9GJDOFjJFyU&libraries=places`;
            script.async = true;
            document.body.appendChild(script);
        };

        if (!window.google) {
            loadGoogleMapsScript();
        }
    }, []);

    const handleSave = async () => {
        // Save the updated data (you can send it to an API or update the context)
        const updatedData = {
            
            ...userData,
            user: {
                ...userData.user,
                name,
                email,
                birthday,
                phone,
                address,
                site,
                gender,
                firstname,
                middle_name,
                lastname,
            }

        };

        try {
            const response = await fetch('/api/users/update/details/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData.user),
            });

            if (response.ok) {
                toast.success('User created successfully!');
            } else {
                toast.error('Failed to update user details!');
            }
        } catch (error) {
            toast.error('Error occurred while updating user!');
        }
        setIsEditing(false); // Exit edit mode
    };
    const handleChange = (address) => {
        setAddress(address);
        
    }
    const handleSelect = (address) => {
        setAddress(address);
        // You can also use Google Places API to parse address components if needed
    };


    return (
        <div>
            {/* Header */}
            <div className="flex items-center mb-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-clirxColor">
                    <Image src="/img/profile.png" alt="Profile Picture" layout="fill" objectFit="cover" />
                </div>
                <div className="ml-6">
                    {(firstname !='' || lastname !='') ? (
                        <h1 className="text-2xl font-semibold text-gray-800"> {firstname} {lastname}</h1>
                    ) : (
                        <h1 className="text-2xl font-semibold text-gray-800"> {name}</h1>
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
                    <li className="flex">
                        <strong className="w-[110px]" >Phone:</strong>{" "}
                        {isEditing ? (
                            <PhoneInput
                                international
                                value={phone}
                                onChange={setPhone}
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <span className="text-gray-600">{phone}</span>
                        )}
                    </li>
                    <li className="flex">
                        <strong className="w-[110px]" >Address:</strong>{" "}
                        {isEditing ? (
                            <PlacesAutocomplete
                                value={address}
                                onChange={handleChange}
                                onSelect={handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div className="relative">
                                        <input
                                            {...getInputProps({
                                                className: "border rounded-md p-1",
                                                placeholder: "Enter your address"
                                            })}
                                        />
                                        <div className="absolute top-full left-0 right-0 bg-white shadow-md max-h-60 overflow-y-auto z-10">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map((suggestion, index) => (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                        className: " cursor-pointer hover:bg-gray-200"
                                                    })}
                                                    key={index}
                                                >
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        ) : (
                            <span className="text-gray-600">{address || "Not Provided"}</span>
                        )}
                    </li>
                    <li className="flex">
                        <strong className="w-[110px]" >Email:</strong>{" "}
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
                    <li className="flex">
                        <strong className="w-[110px]" >Site:</strong>{" "}
                        {isEditing ? (
                            <input
                                type="text"
                                value={site}
                                onChange={(e) => setSite(e.target.value)}
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <span className="text-gray-600">{site}</span>
                        )}
                    </li>
                </ul>
            </div>

            {/* Basic Information */}
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Basic Information</h2>
                <ul className="space-y-2">
                    
                    <li className="flex">
                        <strong className="w-[110px]" >Firstname:</strong>{" "}
                        {isEditing ? (
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <span className="text-gray-600">{firstname}</span>
                        )}
                    </li>

                    <li className="flex">
                        <strong className="w-[110px]" >Middlename:</strong>{" "}
                        {isEditing ? (
                            <input
                                type="text"
                                value={middle_name}
                                onChange={(e) => setMiddleName(e.target.value)}
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <span className="text-gray-600">{middle_name}</span>
                        )}
                    </li>

                    <li className="flex">
                        <strong className="w-[110px]" >Lastname:</strong>{" "}
                        {isEditing ? (
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <span className="text-gray-600">{lastname}</span>
                        )}
                    </li>
                    

                    <li className="flex">
                        <strong className="w-[110px]" >Birthday:</strong>{" "}
                        {isEditing ? (
                            <DatePicker
                                selected={birthday}
                                onChange={(date) => setBirthday(date)}
                                dateFormat="yyyy-MM-dd" // Customize date format here
                                className="border rounded-md p-1"
                            />
                        ) : (
                            <span className="text-gray-600">{  (birthday != '') ? formatDate(birthday) : "" }</span>
                        )}
                    </li>

                    <li className="flex">
                        <strong className="w-[110px]" >Gender:</strong>{" "}
                        {isEditing ? (
                            <select
                                value={gender} // Set the value to the state variable
                                onChange={(e) => setGender(e.target.value)} // Update the state when selection changes
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