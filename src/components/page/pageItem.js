import React from 'react';
import Link from 'next/link';
import { formatDate } from '../../../libs/dateUtils';
import { MdEditNote, MdDelete } from "react-icons/md";

export const PageItem = ({ page, onDelete }) => {


    const handleDelete = async (id) => {
        const confirmDelete = confirm(`Are you sure you want to delete the page "${page.title}"?`);
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

    return (
        <div>
            <div
                className={`flex items-center text-sm py-3 px-4 border-b border-b-gray-200 hover:bg-gray-50 ${page.status == 1
                        ? 'border-r-4 border-green-500 '
                        : 'bg-gray-200 opacity-35 border-r-4 border-blue-500'
                    }`}
            >
                <div className="w-3/4 font-semibold">
                    <Link href={`/page/edit/${page.id}`} className="cursor-pointer text-blue-900">
                        {page.title}
                    </Link>
                </div>
                <div className="w-2/4 text-gray-500">{page.username}</div>
                <div className="w-2/4 text-gray-500 whitespace-pre-wrap">
                    <span className="font-medium text-sm">
                        {page.status == 1 ? 'Publish' : 'Draft'}
                    </span>
                    <div>{formatDate(page.date_created)}</div>
                </div>
                <div className="w-1/4 text-base">
                    <div className="text-base gap-2 flex px-3 items-center">
                        <Link href={`/page/edit/${page.id}`} className="cursor-pointer">
                            <MdEditNote className="text-blue-500" size={25} />
                        </Link>
                        <span className="cursor-pointer" onClick={() => handleDelete(page.id)}>
                            <MdDelete className="text-red-500" size={20} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
