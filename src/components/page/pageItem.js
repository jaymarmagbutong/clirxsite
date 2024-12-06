'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import { MdEditNote, MdDelete } from "react-icons/md";
import { formatDate } from '../../../libs/dateUtils';

const PageItem = ({ page }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [pages, setPages] = useState([])



    useEffect(()=>{
        setPages(page)
    }, [page])


    const handleDelete = async (id, title) => {
        const confirmDelete = confirm(`Are you sure you want to delete the page "${title}"?`);
        if (!confirmDelete) return;

        try {
            // Call API to delete the page
            const response = await fetch(`/api/pages/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) {
                throw new Error('Failed to delete the page');
            }

            // Notify parent component if onDelete is provided
            if (onDelete) onDelete(page.id);
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
        <div>
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
                
        </div>
    );
};


export default PageItem;