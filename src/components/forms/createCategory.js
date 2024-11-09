"use client"
import { useState, useRef } from 'react';
import { slugify } from '@/app/libs/slugily';
import toast from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';

const CategoryForm = ({ triggerResponse }) => {

	const [categoryName, setCategoryName] = useState('');
	const [description, setDescription] = useState('');
	const [slug, setSlug] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const ref = useRef(null);

	const handleTitle = (value) => {
		setSlug(slugify(value));
		setCategoryName(value);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		ref.current.continuousStart();
		try {
			setLoading(true);
			const res = await fetch('/api/category/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					categoryName,
					description,
					slug
				}),
			});

			if (res.ok) {
				toast.success('Category added successfully!');
				triggerResponse();
			}
			if (res.status == 400) {
				toast.error('Category Existed');
			}


		} catch (error) {
			setError(error)
		} finally {

			setLoading(false);
			ref.current.complete();
		}


	};

	return (
		<>
			<LoadingBar color="#336eb0" ref={ref} />
			<form onSubmit={handleSubmit} className="max-full  bg-white p-4  rounded-md">
				{/* <h2 className="font-bold mb-4 text-gray-800">Add New Category</h2> */}
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
						Category Name
					</label>
					<input
						id="categoryName"
						type="text"
						value={categoryName}
						onChange={(e) => handleTitle(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
						Description
					</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
					/>
				</div>
				<button
					type="submit"
					className=" bg-clirxColor text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor"
				>
					{(loading) ? 'Saving...' : 'Add Category'}

				</button>
			</form>
		</>
	);
};

export default CategoryForm;
