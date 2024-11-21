'use client'
import React, { useEffect, useState } from 'react';
import Breadcrumbs from "@/components/breadcrumbs";
import BackButton from "@/components/backButton";
import ModifyPage from '@/components/appt/modifyPage';

export default function Page({ params }) {
    const [content, setContent] = useState(''); // Initialize with an empty string
    const [title, setTitle] = useState('');
    const [apptDetails, setApptDetails] = useState([]);

    // Unwrap params using React.use
    const {id} = React.use(params);
    const pageId = id;

    useEffect(() => {
        const getPageDetails = async () => {
            try {
                const page = await fetch(`/api/pages/get/${pageId}`, { next: { revalidate: 3600 } });
                const data = await page.json();
                
                setContent(data.pages?.description || ''); // Handle case if description is undefined
                setTitle(data.pages?.title || ''); // Handle case if title is undefined
                setApptDetails(data.pages || {});
            } catch (error) {
                console.error('Failed to fetch page details:', error);
            }
        };

        if (pageId) {
            getPageDetails();
        }
    }, [pageId]);

    return (
        <>
            <div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-sm'>
                <div>
                    <h1 className='font-bold text-2xl'>Page Details</h1>
                    <Breadcrumbs />
                </div>
                <div>
                    <BackButton />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div className='col-span-1 md:col-span-3'>
                    <div className="w-full mt-5 p-4 bg-white rounded-md flex flex-col">
                        <h1 className='font-bold text-3xl'>{title}</h1>
                        <div className='border p-4 mt-6 shadow-sm'
                            dangerouslySetInnerHTML={{ __html: content }} 
                        />
                    </div>
                </div>
                
                <div className='mt-5'>
                    <div className='bg-white rounded-md p-4'>
                        <ModifyPage content={content} title={title} apptDetails={apptDetails}/> 
                    </div>
                </div>
            </div>
        </>
    );
}
