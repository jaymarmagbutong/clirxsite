'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CategoryList from '@/components/appt/categoryList';
import PageList  from '@/components/appt/pageList';
import Skeleton from 'react-loading-skeleton';
  
const ApptManual = () => {
	const { data: session, status } = useSession();
	const role = parseInt(session?.user?.role);
	const user_id = session?.user?.id;

	// Initialize pages state as an empty array
	const [cartegories, setcartegories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState(""); 
	// Feching the userperPage
	useEffect(() => {
		const getUserPages = async () => {
			setLoading(true)
			try {
				const page = await fetch(`/api/category/pages`, { next: { revalidate: 3600 } });
				const data = await page.json();
				setcartegories(data || []); // Fallback to an empty array if data is undefined
		
			} catch (error) {
				console.error('Failed to fetch page details:', error);
			} finally {
				setLoading(false)
			}
		};

		if (user_id) {
			getUserPages();
		}
	}, [user_id]);


		// Filter categories based on search term
		const filteredCategories = cartegories.filter((category) => {
			const categoryNameMatches = category.name.toLowerCase().includes(searchTerm.toLowerCase());
			const pagesMatch = category.pages.some((page) =>
				page.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			return categoryNameMatches || pagesMatch;
		});



	if(loading){
		return (
			<div className="w-full p-4 bg-white rounded-md shadow-sm h-100% col-span-4">
				<h2 className="text-xl font-bold mb-6 "><Skeleton count={1}/></h2>
				<div className="mt-4">
					<Skeleton count={2}/>
					<Skeleton count={2}/>
					<Skeleton count={2}/>
					<Skeleton count={2}/>
				</div>
			</div>
			
		)
	}

	if(Object.values(cartegories).length ===0 ){
		return (
			<div className="w-full p-4 bg-white rounded-md shadow-sm h-100% col-span-4">
				<h2 className="text-xl font-bold mb-6 ">No APPT Yet</h2>
			</div>
		)
	}


	return (
		<div className="w-full p-4 bg-white rounded-md shadow-sm h-100% col-span-4">
			<h2 className="text-xl font-bold mb-6">APPT Manual</h2>
			<div className="w-full p-4 bg-white rounded-md shadow-sm ">

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
				{
					filteredCategories.map((category, index) => (
						<CategoryList 
							key={index} 
							title={category.name}
							pages={category.pages}
							searchTerm={searchTerm}
							autoOpen={searchTerm && category.name.toLowerCase().includes(searchTerm.toLowerCase())}
						/>
					))
				}
				</ul>
			</div>
			
		
		</div>
	);
};

export default ApptManual;
