import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useSocket } from "@/app/context/SocketContext";


const CategoryPerPage = () => {
	const [categoryListWithPage, setCategoryListWithPage] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState(""); // State to track the search term
	

	const socket = useSocket();
        
	console.log(categoryListWithPage);

	useEffect(() => {
		if (!socket) return;
    
  

		const getAllCategoryWithPages = async () => {
			try {
				const response = await fetch("/api/category/pages", { next: { revalidate: 3600 } });
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setCategoryListWithPage(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		

		getAllCategoryWithPages();

	}, [socket]);

	// Filter categories based on search term
	const filteredCategories = categoryListWithPage.filter((category) => {
		const categoryNameMatches = category.name.toLowerCase().includes(searchTerm.toLowerCase());
		const pagesMatch = category.pages.some((page) =>
			page.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		return categoryNameMatches || pagesMatch;
	});

	if (loading) {
		return <div><Skeleton count={10} /></div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}



	return (
		<div>
			<div className="mb-4">
				<input
					type="text"
					className="p-2 border rounded w-full"
					placeholder="Search categories and pages..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className="grid grid-cols-3">
				<label className="font-bold mb-6">Name</label>
			</div>
			<ul>
				{filteredCategories.map((category) => (
					<CategoryItem
						key={category.id}
						category={category}
						searchTerm={searchTerm}
						autoOpen={searchTerm && category.name.toLowerCase().includes(searchTerm.toLowerCase())} // Auto open if search term matches category name
					/>
				))}
			</ul>
		</div>
	);
};

export default CategoryPerPage;
