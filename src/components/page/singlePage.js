"use client"
import React, { useEffect, useState } from 'react';
import UsersList from '../user/userList';

const SinglePage = ({ id }) => {
    const [content, setContent] = useState(''); // Initialize with an empty string
    const [title, setTitle] = useState('');

    useEffect(() => {
        const getPageDetails = async () => {
            try {
                const page = await fetch(`/api/pages/get/${id}`, { next: { revalidate: 3600 } });
                const data = await page.json();
                setContent(data.description || ''); // Handle case if description is undefined
                setTitle(data.title || ''); // Handle case if title is undefined
            } catch (error) {
                console.error('Failed to fetch page details:', error);
            }
        }
        getPageDetails();
    });



    return (

        <>


            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>

                <div className='col-span-1 md:col-span-3'>

                    <div className="w-full mt-5 p-4 bg-white rounded-md flex flex-col">
                        <h1 className='font-bold text-3xl'>{title}</h1>
                        <div className='border p-4 mt-6 shadow-md'
                            dangerouslySetInnerHTML={{ __html: content }} 
                        />

                    </div>
                </div>

                <div className='mt-5'>
                    <div className='bg-white  rounded-md p-4'>
                        <UsersList option={'singlepage'} page_id={id}/>
                    </div>
                </div>
            </div>

        
        </>
       
    );
}

export default SinglePage;
