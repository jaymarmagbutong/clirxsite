"use client"
import { useState, useEffect } from 'react';
import CategoryForm from '@/components/forms/createCategory';
import Breadcrumbs from '@/components/breadcrumbs';
import CategoryOption from '@/components/category/categoryOption';
import CategoryPageItem from '@/components/category/type/CategoryPageItem';

import BackButton from '@/components/backButton';

export default function Category() {

	const [isCategory, setIsCategory] = useState(0);
	const [categoryLists, setCategoryLists] = useState([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {

		const getAllCategory = async () => {
			try {
				const response = await fetch('/api/category/get', {
					headers: { 'Cache-Control': 'no-store' },
					next: { revalidate: 0 }
				});
				const data = await response.json()

				setCategoryLists(data);
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false);
			}
		};

		getAllCategory();

	}, [isCategory]);





	const triggerCategory = () => {
		setIsCategory(isCategory + 1);
	}

	return (
		<>
			<div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-md'>
				<div>
					<h1 className='font-bold text-2xl'>Add Category</h1>
					<Breadcrumbs />
				</div>
				<div>
					<BackButton />
				</div>
			</div>



			<div className='grid grid-cols-12 md:grid-cols-4 gap-4 mt-5'>

				<div className='col-span-12 md:col-span-2 '>
					<CategoryForm triggerResponse={triggerCategory} />
				</div>

				<div className='col-span-12  md:col-span-2'>
					<div className='bg-white  rounded-md p-4'>
						<div className='font-bold pb-4 relative'>Category List</div>
						< CategoryPageItem categories={categoryLists} />
					</div>	
				</div>

			</div>

		</>
	);


}
