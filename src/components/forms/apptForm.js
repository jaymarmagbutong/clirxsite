'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/table.min.js'; // Import the table plugin
import 'froala-editor/js/plugins/code_view.min.js'; // Import the code editor plugin
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/plugins/table.min.css'; // Import table plugin styles
import 'froala-editor/css/plugins/code_view.min.css'; // Import code editor plugin styles
import 'froala-editor/js/plugins/font_family.min.js'; // Import font family plugin
import 'froala-editor/js/plugins/print.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/font_size.min.js'; // Import font size plugin
import 'froala-editor/js/plugins/paragraph_format.min.js'; // Import the paragraph format plugin

import 'froala-editor/js/plugins/video.min.js'; // Import video plugin

import 'froala-editor/js/plugins/paragraph_style.min.js'; // Import paragraph style plugin
import 'froala-editor/js/plugins/colors.min.js'; // Font color plugin JavaScript
import 'froala-editor/css/plugins/colors.min.css'; // Font color plugin CSS
import FroalaEditor from 'react-froala-wysiwyg';
import { useSession } from "next-auth/react";



const ApptForm = ({ contents, apptDetails }) => {

    const [description, setDescription] = useState(apptDetails.description);

    const { data: session, status } = useSession();
    const { user } = session;


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
    }, []);


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

            // className="h-screen"
            // config={{
            //   heightMin: 400, 
            // }}
            />

            <button type="submit" 
            onClick={handleUpdate} 
            className="bg-clirxColor mt-3 text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor">Submit Changes</button>
        </div>
    )
}

export default ApptForm