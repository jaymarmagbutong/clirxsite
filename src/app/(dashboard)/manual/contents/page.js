"use client";
import React, { useState, Suspense } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import { MdSettingsInputComponent } from "react-icons/md";
import Link from 'next/link';
import CategoryPerPage from '@/components/category/type/pages';
import { GiHamburgerMenu } from "react-icons/gi";

const CreateContent = () => {
	const [filter, setFilter] = useState(false);
	const [isOpenManage, setIsOpenManage] = useState(false);

	const handleFilterToggle = () => {
		setIsOpenManage(false);
		setFilter(prevFilter => !prevFilter);
	};

	const handleMenuToggle = () => setIsOpenManage(prev => !prev);

	return (
		<>
			<div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-md'>

				<div>
					<h1 className='font-bold text-2xl'>Contents</h1>
					<Breadcrumbs />
				</div>

				<div className='flex justify-between items-center gap-3'>

					<div className='p-3 rounded-full shadow-lg cursor-pointer' onClick={handleFilterToggle}>
						<MdSettingsInputComponent size={20} />
					</div>

					<div className="relative inline-block text-left">
						<div className='p-3 rounded-full shadow-lg bg-clirxColor cursor-pointer' onClick={handleMenuToggle}>
							<GiHamburgerMenu size={20} color='white' />
						</div>

						{ isOpenManage && (
							<div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical">
								<div className="py-1">
									<Link href="/page/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Page</Link>
									<Link href="/category" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Category</Link>
								</div>
							</div>
						)}

					</div>
				</div>
			</div>

			<div className='grid grid-cols-4 gap-4 mt-5'>
				<div className={`w-full p-4 bg-white rounded-md shadow-md ${!filter ? 'col-span-4' : 'col-span-3'}`}>
					<CategoryPerPage />
				</div>
				<div className={`bg-white p-4 rounded-md w-full ${!filter ? 'hidden' : 'block'}`}>
					Filter
				</div>
			</div>
		</>
	);
};

export default CreateContent;
