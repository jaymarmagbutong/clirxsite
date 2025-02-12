'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumbs from "@/components/breadcrumbs";
import BackButton from "@/components/backButton";
import ModifyPage from '@/components/appt/modifyPage';
import Comment from '@/components/appt/comments';
import { FaGlobeAmericas } from "react-icons/fa"
import { formatDate } from '../../../../../../libs/dateUtils';

export default function Page({ params }) {
    const router = useRouter();
    const [content, setContent] = useState(''); // Initialize with an empty string
    const [title, setTitle] = useState('');
    const [apptDetails, setApptDetails] = useState([]);
    const [comments, setComments] = useState([]); // To store comments
    // Unwrap params using React.use
    const {id} = React.use(params);
    const pageId = id;

    useEffect(() => {
        const getPageDetails = async () => {
            try {
                const page = await fetch(`/api/pages/get/${pageId}`, { next: { revalidate: 3600 } });
                const data = await page.json();

                if (!data.appt_interaction) {
                    router.push('/appt-interaction');
                }
                console.log(data)
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
                    <div className="jodit-wysiwyg  w-full mt-5 p-4 bg-white rounded-md flex flex-col">
                        <h1 className='font-bold text-3xl'>{title}</h1>
                        <div className='border p-4 mt-6 shadow-sm'
                            dangerouslySetInnerHTML={{ __html: content }} 
                        />
                        <div>
                            <span className='mt-2 text-sm text-gray-500 flex items-center gap-2 w-80'><FaGlobeAmericas/> <>{formatDate(apptDetails?.date_created)}</></span>
                        </div>
                    </div>
                    <div className='bg-white rounded-md p-4'>
                        <ModifyPage content={content} title={title} apptDetails={apptDetails}/> 
                    </div>
                    <div className='bg-white rounded-md mt-5'>
                        <Comment commentData={comments} pageId={pageId}/> 
                    </div>
                </div>
                
                <div className='mt-5'>

                </div>
            </div>
        </>
    );
}
