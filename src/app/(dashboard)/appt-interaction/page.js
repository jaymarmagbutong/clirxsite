'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ApptInteractionCategoryList from '@/components/appt/apptInteractionCategoryList';
import Skeleton from 'react-loading-skeleton';

const ApptInteraction = () => {
	const { data: session, status } = useSession();
	const role = parseInt(session?.user?.role);
	const user_id = session?.user?.id;

	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	// Fetching user pages
	useEffect(() => {
		const getUserPages = async () => {
			setLoading(true);
			try {
				const response = await fetch(`/api/appt/get/user/${user_id}`, { next: { revalidate: 3600 } });
				const data = await response.json();
				setCategories(data || []); // Fallback to an empty array if data is undefined
			} catch (error) {
				console.error('Failed to fetch page details:', error);
			} finally {
				setLoading(false);
			}
		};

		if (user_id) {
			getUserPages();
		}
	}, [user_id]);

	// Filter categories based on search term
	const filteredCategories = Array.isArray(categories)
		? categories.filter((category) => {
			const categoryNameMatches = category.CategoryTitle.toLowerCase().includes(searchTerm.toLowerCase());
			const pagesMatch = category.Pages.some((page) =>
				page.PageTitle.toLowerCase().includes(searchTerm.toLowerCase())
			);
			return categoryNameMatches || pagesMatch;
		})
		: [];

	// Loading Skeleton
	if (loading) {
		return (
			<div className="w-full p-4 bg-white rounded-md shadow-sm h-100% col-span-4">
				<h2 className="text-xl font-bold mb-6">
					<Skeleton count={1} />
				</h2>
				<div className="w-full mt-4">
					<Skeleton count={8} />
				</div>
			</div>
		);
	}

	// Handle empty categories
	if (categories.length === 0) {
		return (
			<div className="w-full p-4 bg-white rounded-md shadow-sm h-100% col-span-4">
				<h2 className="text-xl font-bold mb-6">No APPT Yet</h2>
			</div>
		);
	} else {
// Main Render
		return (
			<div className="w-full p-4 bg-white rounded-md shadow-sm h-100% col-span-4">
				<h2 className="text-xl font-bold mb-6">APPT Interaction</h2>
				<div className="w-full p-4 bg-white rounded-md shadow-sm">
					<div className="mb-4">
						<input
							type="text"
							className="p-2 border rounded w-full"
							placeholder="Search categories and pages..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<ul>
						{filteredCategories.map((category, index) => (
							<ApptInteractionCategoryList
								key={index}
								title={category.CategoryTitle}
								pages={category.Pages}
								searchTerm={searchTerm}
								autoOpen={searchTerm && category.CategoryTitle.toLowerCase().includes(searchTerm.toLowerCase())}
							/>
						))}
					</ul>
				</div>
			</div>
		);
	}

	
};

export default ApptInteraction;
