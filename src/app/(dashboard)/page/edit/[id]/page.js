"use client"
import React, { useEffect, useState } from 'react';
import ImageSelectorModal from '@/components/modals/ImageSelectorModal';
import Image from 'next/image';
import { FaPlusCircle } from "react-icons/fa";
import Breadcrumbs from '@/components/breadcrumbs';
import UpdatePageForm from '@/components/forms/updatePage';
import CategoryOption from '@/components/category/categoryOption';
import BackButton from '@/components/backButton';
import PageVisibility from '@/components/page/pageVisibility';



export default function Page({ params }) {

    const [pageDetails, setPageDetails] = useState([]);
  
    const [modalIsOpen, setIsOpen] = useState(false);
    const [attachment, setAttachment] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('')

    const { id } = React.use(params); // Unwrap params to get id


    useEffect(()=>{

        const getPageDetails = async () => {
            try {

                const page = await fetch(`/api/pages/get/${id}`);
                const response = await page.json()
                setPageDetails(response);
                if (response?.pages?.category) {
                    setCategory(response.pages.category);
                }

                if (response?.pages?.attachments) {
                    setAttachment(response.pages.attachments);
                }
                
                if (response?.pages?.status) {
                    setStatus(response.pages.status);
                }
            } catch (error) {
                console.error('Failed to fetch page details:', error);
            }
        }

        getPageDetails();
    }, [id]);


    console.log(pageDetails)


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleImageSelection = (image) => {
        setAttachment(image);
        closeModal(); // Close modal after selection (optional)
    };

    const getCatVal = (value) => {
        setCategory(value);
    };

    const getStatus = (value) => {
        setStatus(value)
    }

    
    return (
        <div>
        <div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-sm'>
            <div>
                <h1 className='font-bold text-2xl'>Edit Page</h1>
                <Breadcrumbs />
            </div>
            <div>
                <BackButton />
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='col-span-1 md:col-span-3'>
                <div className="w-full mt-5 p-4 bg-white rounded-md">
                    <UpdatePageForm 
                        attachments={attachment}
                        category={category}
                        status={status}
                        pageDetails={pageDetails}
                    />
                </div>
            </div>

            <div className='mt-5'>
                <div className='bg-white rounded-md p-4'>
                <h4 className='font-bold mb-3 '>Page Details</h4>
                <hr className='mb-4'></hr>
                
                    <div className='mb-5'>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700"> Category </label>
                        <CategoryOption  getValue={getCatVal} defaultCatValue = {category}/>
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700"> Page Visibility </label>
                        <PageVisibility getStatus={getStatus} defaultStatus={status}/>
                    </div>

                    <button onClick={openModal} className='flex items-center justify-center bg-gray-200 px-2 p-1 rounded-lg'> 
                        <FaPlusCircle className='mr-2' /> Add Attachments
                    </button>

                     <ImageSelectorModal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        onSelectImage={handleImageSelection}
                    /> 

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