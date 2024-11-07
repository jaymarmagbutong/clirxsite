"use client"
import React, { useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { formatDate } from '../../../libs/dateUtils';
import { FaGlobeAmericas } from "react-icons/fa"
const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
    ssr: false,
});


const SingleContent = ({ pages }) => {
    const [editable, setEditable] = useState(false)
    const [pageDescription, setPageDescription] = useState();
    const { data: session, status } =  useSession();

    useEffect(() => {
        // Only import Froala editor plugins when on the client side
        if (typeof window !== 'undefined') {
            // Import Froala JS and CSS files
            import('froala-editor/js/froala_editor.pkgd.min.js');
            
            // Additional plugins
            import('froala-editor/js/plugins/image.min.js');
            import('froala-editor/js/plugins/table.min.js');
            import('froala-editor/js/plugins/code_view.min.js');
            import('froala-editor/js/plugins/font_family.min.js');
            import('froala-editor/js/plugins/print.min.js');
            import('froala-editor/js/plugins/lists.min.js');
            import('froala-editor/js/plugins/font_size.min.js');
            import('froala-editor/js/plugins/video.min.js');
            import('froala-editor/js/plugins/paragraph_format.min.js');
            import('froala-editor/js/plugins/paragraph_style.min.js');
            import('froala-editor/js/plugins/colors.min.js');
            
            // Import the link plugin
            import('froala-editor/js/plugins/link.min.js');
    
            // CSS files
            import('froala-editor/css/froala_editor.pkgd.min.css');
            import('froala-editor/css/froala_style.min.css');
            import('froala-editor/css/plugins/image.min.css');
            import('froala-editor/css/plugins/table.min.css');
            import('froala-editor/css/plugins/code_view.min.css');
            import('froala-editor/css/plugins/colors.min.css');
        }
    }, []);

    console.log(session);

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

    const handleModelChange = (model) => {
        setPageDescription(model);
    };

    return (

        <>
            <div className="w-full mt-5 p-4 bg-white rounded-md flex flex-col">
                <h1 className='font-bold text-3xl flex items-center justify-between w-full'><span>{pages.title}</span> <span>{(pages.reference_number !== '' && pages.reference_number !== undefined) ? `(${pages?.reference_number})` : ''}</span></h1>
                <div className={(editable) ? 'w-full flex flex-col items-end mt-6 ' : `border p-4 mt-6 shadow-md flex w-full flex-col items-end`}>
                    <span className='p-2 border rounded-sm cursor-pointer mb-4' onClick={isEditable}><MdEdit /></span>

                    {editable ? (
                        <FroalaEditor
                            tag="textarea"
                            model={pageDescription}
                            onModelChange={handleModelChange}
                            config={{
                                heightMin: 400,
                            }}
                            className='z-[-0] floalas'
                            style={{ width: '100%' }}
                        />
                    ) : (
                        <div className='w-full'
                            dangerouslySetInnerHTML={{ __html: pageDescription }}
                        />
                    )}
                    <span className='mt-2 text-sm text-gray-500 flex items-center gap-2'><FaGlobeAmericas/> <>{formatDate(pages.date_created)}</></span>
                </div>

            </div>

            {
                (editable) && (
                    <div className='mt-5'>
                        <button className='bg-clirxColor text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor' onClick={haddleApproved}>Finalize</button>
                    </div>
                )

            }
        </>

    );
}

export default SingleContent; 
