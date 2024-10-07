"use client"
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
const roles = ['Admin', 'Editor', 'Viewer']; // Define roles for the select list

export default function EditUserForm({ id, onUpdate }) {
	const [user, setUser] = useState(null);
	const [formData, setFormData] = useState({ name: '', email: '', role: '' });

	useEffect(() => {

		if (id) {

			const fetchUser = async () => {

				try {
					const response = await fetch(`/api/users/get/${id}`);
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					const data = await response.json();
					setUser(data);
					
					setFormData({
						name: data.username,
						email: data.email,
						role: data.role,
					});
					
				} catch (error) {
					console.log("Error users", error)
				}


			};
			fetchUser();
		}


	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevData => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await updateUser(id, formData);
		onUpdate(); // Call onUpdate callback to notify parent component
	};


	if (!user) return (
		<div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mx-auto mt-5">
		<h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit User</h2>
		<Skeleton count={10}/>
	</div>
	);

	return (
		<div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mx-auto mt-5">
			<h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit User</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">Name</label>
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
							<option key={role} value={index+1}>
								{role}
							</option>
						))}
					</select>
				</div>
				<button type="submit" className=" bg-clirxColor text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor">
					Save Changes
				</button>
			</form>
		</div>
	);
}
