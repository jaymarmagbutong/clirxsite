'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useSocket } from '@/app/context/SocketContext';

const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
    ssr: false,
  });

import { useSession } from "next-auth/react";


const ApptForm = ({ contents, apptDetails }) => {
    const socket = useSocket()  

    useEffect(() => {
        // Only import Froala editor plugins when on the client side
        if (typeof window !== 'undefined') {
            // Import Froala JS and CSS files
            import('froala-editor/js/froala_editor.pkgd.min.js');
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
            
            import('froala-editor/css/froala_editor.pkgd.min.css');
            import('froala-editor/css/froala_style.min.css');
            import('froala-editor/css/plugins/image.min.css');
            import('froala-editor/css/plugins/table.min.css');
            import('froala-editor/css/plugins/code_view.min.css');
            import('froala-editor/css/plugins/colors.min.css');
        }
    }, [apptDetails]);

 
    const [description, setDescription] = useState('');
    const { data: session, status } = useSession();
    const { user } = session;


    useEffect(()=> {
        setDescription(apptDetails.description)
    }, [])
    
    useEffect(() => {
   
        const getPagePerUser = async () => {
            try {

                const params = {
                    user_id: user.id,
                    page_id: apptDetails.id,
                };
                
                const page = await fetch(`/api/appt/page/user/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params)
                    
                });

                const data = await page.json();

               if(data){
                setDescription(data)
               }
           
            } catch (error) {
                console.error('Failed to fetch page details:', error);
            }
        }

        getPagePerUser();
    }, [apptDetails.id, user.id]);


    const handleModelChange = (model) => {
        setDescription(model);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        // Assuming you have the following values from form inputs or state
        const updateData = {
            user_id: user.id,  // This should be the ID of the accreditation you want to update
            page_id: apptDetails.id,
            description: description
        };

        try {
            const response = await fetch('/api/appt/put/appt/', {
                method: 'PUT',  // Use PUT method to update the resource
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                throw new Error('Failed to update accreditation');
            }

            const results = await response.json();
            console.log('Accreditation Updated Successfully', results);
            toast.success('Updated successfully!');

            socket.emit('message', updateData);

        } catch (error) {
            console.error('Error updating accreditation:', error);
        }
    };
    
    return (
        <div>
            <FroalaEditor
                tag="textarea"
                model={description}
                onModelChange={handleModelChange}
                config={{
                    heightMin: 400,
                    imageUploadURL: '/api/upload/',  // Route to handle image uploads
                }}
            />

            <button type="submit" 
                onClick={handleUpdate} 
                className="bg-clirxColor mt-3 text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor">Submit Changes</button>
        </div>
    )
}

export default ApptForm