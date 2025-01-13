"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { MdEdit } from "react-icons/md";
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { formatDate } from '../../../libs/dateUtils';
import { FaGlobeAmericas } from "react-icons/fa"
const JoditEditor = dynamic(() => import('jodit-pro-react'), { ssr: false });



const SingleContent = ({ pages }) => {
    const [editable, setEditable] = useState(false)
    const [pageDescription, setPageDescription] = useState();
    const { data: session, status } =  useSession();


    useEffect(() => {

        setPageDescription(pages.description)

    }, [pages.description]);

    const haddleApproved = async () => {
      
        try {
            const res = await fetch('/api/appt/history/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: {
                        response: pageDescription,
                    }, 
                    pageId: pages.id,
                    oldPageContent: pages.description,
                    updated_at: 1,
                    from_user_id: session?.user?.id
                }),
            });

            if (res.ok) {
                toast.success('History added successfully!');
            }

        } catch (error) {
            console.log(error)
            toast.error('Error Creating History');
        } 
    }

    const isEditable = () => {
        setEditable(prevModalStatus => !prevModalStatus);
    }


    const config = useMemo(() => ({
        license: 'B74F2-13481-A9NJJ-97M9Z',
        readonly: false,
        toolbar: true,
        uploader: {
            url: 'http://192.168.5.110/api/storage/upload/',  // URL to handle the file upload
            method: 'POST',
            format: 'json',
            filesVariableName: () => "file",
        },
    }), []);

    return (

        <div>
            <div className="w-full mt-5 p-4 bg-white rounded-md shadow-sm flex jodit-wysiwyg flex-col">
                <h1 className='font-bold text-3xl flex items-center justify-between w-full'><span>{pages.title}</span> <span>{(pages.reference_number !== '' && pages.reference_number !== undefined) ? `(${pages?.reference_number})` : ''}</span></h1>
                <div className={(editable) ? 'w-full flex flex-col mt-6 ' : `border p-4 mt-6 shadow-sm flex w-full flex-col items-end`}>
                  

                    {editable ? (
                        
                        <JoditEditor
                            config={config} 
                            value={pageDescription}
                            onChange={(newdescription) => setPageDescription(newdescription)}
                        />
                    ) : (
                        <div className='w-full fr-view'
                            dangerouslySetInnerHTML={{ __html: pageDescription }}
                        />
                    )}
                </div>

                <div className='flex items-center justify-between mt-4'>
                    <div>
                        <span className='mt-2 text-sm text-gray-500 flex items-center gap-2 w-80'><FaGlobeAmericas/> <>{formatDate(pages.date_created)}</></span>
                    </div>
                    <div>

                    {
                        editable ? (
                            <div className='py-1 px-2 gap-1 border rounded-sm cursor-pointer mb-2 flex items-center justify-center' onClick={isEditable}>
                                <MdEdit /> <span> Edit Mode</span>
                            </div>
                        ) : (
                            <div className='p-2 border rounded-sm cursor-pointer mb-2' onClick={isEditable}>
                                <MdEdit />
                            </div>
                        )
                    }
                        
                       

                    </div>
                </div>
                
            </div>

            {
                (editable) && (
                    <div className='mt-5'>
                        <button className='bg-clirxColor text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor' onClick={haddleApproved}>Finalize</button>
                    </div>
                )
            }
        </div>

    );
}

export default SingleContent; 
