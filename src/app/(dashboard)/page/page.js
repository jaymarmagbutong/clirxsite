'use client';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import BackButton from '@/components/backButton';
import { CiSquarePlus } from "react-icons/ci";
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import { MdEditNote, MdDelete } from "react-icons/md";
import { formatDate } from '../../../../libs/dateUtils';

const Page = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

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
    }, []);

    const handleDelete = async (id, title) => {
        const confirmDelete = confirm(`Are you sure you want to delete the page "${title}"?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/pages/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete the page');
            }

            // Update the state to remove the deleted page
            setPages((prevPages) => prevPages.filter((page) => page.id !== id));
        } catch (error) {
            console.error(error.message);
            alert('Failed to delete the page. Please try again.');
        }
    };

    // Filter pages based on the search query
    const filteredPages = pages.filter((page) =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Define DataTable columns
    const columns = [
        {
            name: 'Title',
            selector: (row) => row.title, // Use raw data for sorting
            sortable: true,
            cell: (row) => (
                <Link href={`/page/edit/${row.id}`} className="text-blue-900 font-semibold">
                    {row.title}
                </Link>
            ),
        },
        {
            name: 'Author',
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: 'Date',
            selector: (row) => formatDate(row.date_created),
            sortable: true,
        },
       {
            name: 'Status',
            selector: (row) => row.status, // Use raw data for sorting
            sortable: true,
            cell: (row) => (
                <span className="font-semibold">
                    {row.status === 1 ? 'Publish' : 'Draft'}
                </span>
            ),
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex gap-2 items-center">
                    <Link href={`/page/edit/${row.id}`}>
                        <MdEditNote className="text-blue-500 cursor-pointer" size={25} />
                    </Link>
                    <MdDelete
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => handleDelete(row.id, row.title)}
                    />
                </div>
            ),
        },
    ];


       // Conditional row styling
    const conditionalRowStyles = [
        {
            when: (row) => row.status === 1, // Example: Apply style to published rows
            classNames: ['!bg-white'],   // Add Tailwind or custom classes
        },
        {
            when: (row) => row.status !== 1, // Example: Apply style to draft rows
            classNames: ['!bg-gray-100 opacity-45'],     // Add Tailwind or custom classes
        },
    ];

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

                {/* DataTable */}
                {loading ? (
                    <div className="py-4 text-center text-gray-500">Loading pages...</div>
                ) : error ? (
                    <div className="py-4 text-center text-red-500">Failed to load pages: {error}</div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={filteredPages}
                        pagination 
                        paginationPerPage={10}
                        highlightOnHover
                        responsive
                        striped 
                        conditionalRowStyles={conditionalRowStyles}
                    />
                )}
            </div>
        </>
    );
};

export default Page;
