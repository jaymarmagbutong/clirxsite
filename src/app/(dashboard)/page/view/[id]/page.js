"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Breadcrumbs from '@/components/breadcrumbs';
import CategoryOption from '@/components/category/categoryOption';
import BackButton from '@/components/backButton';
import Comment from '@/components/appt/comments';
import Skeleton from 'react-loading-skeleton';

export default function Page({ params }) {

    const [pageDetails, setPageDetails] = useState([]);
  
    const [attachment, setAttachment] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = React.use(params); // Unwrap params to get id


    useEffect(()=>{

        const getPageDetails = async () => {
            try {

                const page = await fetch(`/api/pages/get/${id}`);
                const response = await page.json()
                setPageDetails(response);
                if (response?.pages?.category) {
                    setCategory(response.pages.category);
                    setTitle(response.pages.title)
                    setDescription(response.pages.description)
                }

                if (response?.pages?.attachments) {
                    setAttachment(response.pages.attachments);
                }
                
                if (response?.pages?.status) {
                    setStatus(response.pages.status);
                }
            } catch (error) {
                console.error('Failed to fetch page details:', error);
            } finally {
                setLoading(false)
            }
        }

        getPageDetails();
    }, [id]);


    const getCatVal = (value) => {
        setCategory(value);
    };

    if(loading){
        return (
            <Skeleton count={5} />
        )
    }

    return (
        <div>
        <div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-sm'>
            <div>
                <h1 className='font-bold text-2xl'>View Page</h1>
                <Breadcrumbs />
            </div>
            <div>
                <BackButton />
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='col-span-1 md:col-span-3'>
                <div className="w-full mt-5 p-4 bg-white rounded-md">

                    <div className='pb-4'>
                        <p className='text-lg font-bold' >{title}</p>
                    </div>
                    <div className='mt-6'>
                        <div className="flex flex-col">
                            <div className='w-full fr-view'
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        </div>
                        
                    </div>
                </div>


                <div className='mt-4 rounded-md'>
                    <Comment commentData={comments} pageId={id}/> 
                </div>
            </div>

          

            <div className='mt-5'>
                <div className='bg-white rounded-md p-4'>
                    <h4 className='font-bold mb-3 '>Page Details</h4>
                    <hr className='mb-4'></hr>
                    
                        <div className='mb-5'>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700"> Category </label>
                            <CategoryOption  getValue={getCatVal} defaultCatValue = {category} disabled={true}/>
                        </div>

                        <div className='mb-5 border-1 border-gray-200 p-2 rounded-md'>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700"> Page Visibility </label>
                            <p className='border-t-1 border-gray-200 mt-2'>
                                {
                                    (status == 1) ? 'Publish' : 'Draft'
                                }

                            </p>
                        </div>

                        {attachment && (
                            <div className="w-full h-60 overflow-hidden mt-2 bg-gray-100 border border-gray-300 flex flex-wrap justify-center items-center"> 
                                <Image
                                    src={attachment}
                                    alt="Image"
                                    width={388}
                                    height={388}
                                    className="object-cover"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </div>
            </div>
        </div>
    </div>
    )
       
	
}