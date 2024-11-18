'use client'
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import BackButton from '@/components/backButton';
import { CiSquarePlus } from "react-icons/ci";
import { PageItem } from '@/components/page/pageItem';
import Link from 'next/link';

const Page = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    const [updatePage, setUpdatePage] = useState(true);

    useEffect(() => {
        const getPages = async () => {
            try {
                const response = await fetch("/api/pages/get", { next: { revalidate: 3600 } });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setPages(data.pages);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getPages();
    }, [updatePage]);


    const updateTrigger = () => {
		setUpdatePage(prevUpdatePage => !prevUpdatePage);
	}




    // Filter pages based on the search query
    const filteredPages = pages.filter((page) =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-md'>
                <div>
                    <h1 className='font-bold text-2xl'>Pages</h1>
                    <Breadcrumbs />
                </div>
                <div className='flex gap-3 items-center'>
                    <div>
                        <Link href="/page/create/">
                            <CiSquarePlus size={40} className='cursor-pointer' />
                        </Link> 
                    </div>
                    <div>
                        <BackButton />
                    </div>
                </div>
            </div>

            <div className='bg-white py-2 px-2 rounded-md shadow-md mt-4'>
                {/* Search Box */}
                <div className='mb-4'>
                    <input
                        type="text"
                        placeholder="Search pages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                    />
                </div>

                <div className='w-full'>
                    {/* Header Row */}
                    <div className="flex items-center bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 border-b">
                        <div className="w-3/4 text-base">Title</div>
                        <div className="w-2/4 text-base">Author</div>
                        <div className="w-2/4 text-base">Date</div>
                        <div className="w-1/4 text-base">Actions</div>
                    </div>

                    {/* Page List */}
                    {filteredPages.map((page, index) => (
                        <PageItem key={index} page={page} onDelete={updateTrigger}/>
                    ))}

                    {/* No results message */}
                    {filteredPages.length === 0 && (
                        <div className="py-4 text-center text-gray-500">
                            No pages found.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Page;
