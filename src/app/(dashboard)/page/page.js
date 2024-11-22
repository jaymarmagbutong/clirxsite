'use client';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import BackButton from '@/components/backButton';
import { CiSquarePlus } from "react-icons/ci";
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import { MdEditNote, MdDelete } from "react-icons/md";
import { formatDate } from '../../../../libs/dateUtils';
import  PageItem  from '@/components/page/pageItem';

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

   
    return (
        <>
            <div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-sm'>
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

            <div className='bg-white p-4 rounded-md shadow-sm mt-4'>
                <PageItem page={pages}/>
            </div>
        </>
    );
};

export default Page;
