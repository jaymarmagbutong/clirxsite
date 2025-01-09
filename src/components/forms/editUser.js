"use client"
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from "next/navigation";

const roles = ['Admin', 'Editor', 'Viewer'];

export default function EditUserForm({ id, onUpdate }) {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: '', password: '', id: id });
    const [suggestedPassword, setSuggestedPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter()

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/users/get/${id}`);
                    if (!response.ok) throw new Error('Failed to fetch user data.');
                    const data = await response.json();
                    setUser(data);
                    setFormData({
                        name: data.username,
                        email: data.email,
                        role: data.role,
                        password: '', // Leave password blank initially
                    });
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [id]);

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

        password = password.split('').sort(() => Math.random() - 0.5).join('');
        setSuggestedPassword(password);
        setFormData((prevData) => ({ ...prevData, password }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
            if (!passwordRegex.test(formData.password)) {
                setError("Password must be at least 8 characters long and include letters, numbers, and special characters.");
                return;
            }
        }

        try {
            const response = await fetch(`/api/users/update/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    password: formData.password || undefined,
                    id: parseInt(id)
                })
            });
            if (response.ok) {
                router.push('/user')
            } else {
                throw new Error('Failed to update user.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm mx-auto mt-5">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit User</h2>
            <Skeleton count={10} />
        </div>
    );

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm mx-auto mt-5">
            {error && (
                <div className="mb-4 p-4 bg-red-500 text-white rounded-md">
                    {error}
                </div>
            )}
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit User</h2>

			
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">Username</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">New Password (optional)</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Enter new password if changing"
                    />
                    <button
                        type="button"
                        className="mt-2 text-sm text-white bg-blue-500 py-1 px-2 rounded"
                        onClick={generatePassword}
                    >
                        Suggest Strong Password
                    </button>
                    {suggestedPassword && (
                        <p className="mt-2 text-md text-gray-600 dark:text-gray-400 py-1 px-2 border">
                            Suggested Password: <span className="font-mono">{suggestedPassword}</span>
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
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
    );
}
