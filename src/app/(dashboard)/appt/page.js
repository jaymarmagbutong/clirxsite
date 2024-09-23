'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CategoryList from '@/components/appt/categoryList';
import PageList  from '@/components/appt/pageList';
import Skeleton from 'react-loading-skeleton';
  
const Accreditation = () => {
	const { data: session, status } = useSession();
	const role = parseInt(session?.user?.role);
	const user_id = session?.user?.id;

	// Initialize pages state as an empty array
	const [cartegories, setcartegories] = useState([]);
	const [singlePages, setSinglePages] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [loading, setLoading] = useState(false)

	// Feching the userperPage
	useEffect(() => {
		const getUserPages = async () => {
			setLoading(true)
			try {
				const page = await fetch(`/api/appt/get/user/${user_id}`, { next: { revalidate: 3600 } });
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


	const pagesCallback = (data, cat_id) => {
		setSinglePages(data)
		setSelectedCategory(cat_id)
	}

	if(loading){
		return (
			<div className="w-full p-4 bg-white rounded-md shadow-md h-100% col-span-4">
				<h2 className="text-xl font-bold mb-6 "><Skeleton count={1}/></h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-8 gap-6 mt-4">
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
			<div className="w-full p-4 bg-white rounded-md shadow-md h-100% col-span-4">
				<h2 className="text-xl font-bold mb-6 ">No APPT Yet</h2>
			</div>
		)
	}


	return (
		<div className="w-full p-4 bg-white rounded-md shadow-md h-100% col-span-4">
			<h2 className="text-xl font-bold mb-6">APPT Lists</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-8 gap-6 mt-4">

				{
					Object.values(cartegories).map((cartegory, index) => (
						<CategoryList 
							key={index} 
							title={cartegory.CategoryTitle}
							cat_id={cartegory.CategoryId}
							pages={cartegory.Pages}
							callback={pagesCallback}
							selected={selectedCategory === cartegory.CategoryId}
						/>
					))
				}
			</div>
			
			{ ( singlePages.length > 0 ) && (

				<div className='mt-6'>
					<table className="min-w-full table-auto">
					<thead className="bg-gray-100 text-gray-600">
					<tr>
						<th className="px-4 py-2 text-left">File</th>
						<th className="px-4 py-2  text-left">Date Sent</th>
						<th className="px-4 py-2 text-left">Actions</th>
					</tr>
					</thead>
					<tbody className="text-gray-700">
							{	singlePages.map((pagelist, index)=> (
									<>
										<PageList key={index} pageDetails={pagelist}/>
			
									</>
								))
							}
					</tbody>
					</table>
				</div>
			)}

		</div>
	);
};

export default Accreditation;
