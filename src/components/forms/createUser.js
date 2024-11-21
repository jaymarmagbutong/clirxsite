'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateUser() {
    const roles = ['Admin', 'Editor', 'Viewer'];
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [suggestedPassword, setSuggestedPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState();

    const generatePassword = () => {
        const length = 8;
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const specialChars = "@$!%*?&#";
        const allChars = lowercase + uppercase + numbers + specialChars;

        let password = "";
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];

        for (let i = 4; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Shuffle the password to avoid predictable patterns
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        setSuggestedPassword(password);
        setPassword(password);
    };

    const formSubmitFunction = async (e) => {
        e.preventDefault();
        if (!email || !name) {
            setError("All fields are necessary.");
            return false;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long and include letters, numbers, and special characters.");
            return false;
        }

        try {
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password, role
                })
            });

            if (res.ok) {
                const data = await res.json();
                router.push('/user');
            } else {
                setError("User already exists.");
            }
        } catch (error) {
            setError("Error during registration: " + error.message);
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm mx-auto mt-5">
            {error && (
                <div className='w-full p-4 bg-red-500 text-white rounded-md'>
                    {error}
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Add User</h2>
            <form onSubmit={formSubmitFunction}>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-2 border rounded-lg"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 border rounded-lg"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-2 border rounded-lg"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <div className='flex'>
                    <button 
                        type="button" 
                        className="mt-2 text-sm text-white bg-clirxSkyLightColor py-1 px-2"
                        onClick={generatePassword}
                    >
                        Suggest Strong Password
                    </button>
                    {suggestedPassword && (
                        <p className="mt-2 text-md text-gray-600 dark:text-gray-400  py-1 px-2 border">
                            <span className="font-mono border-1">{suggestedPassword}</span>
                        </p>
                    )}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        className="w-full p-2 border rounded-lg"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select a role</option>
                        {roles.map((role, index) => (
                            <option key={role} value={index + 1}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-clirxColor text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor">
                    Save Changes
                </button>
            </form>
        </div>
    )
}
