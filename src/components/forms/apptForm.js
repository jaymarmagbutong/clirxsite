'use client';
import React, { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useSocket } from '@/app/context/SocketContext';

const JoditEditor = dynamic(() => import('jodit-pro-react'), { ssr: false });


import { useSession } from "next-auth/react";


const ApptForm = ({ contents, apptDetails }) => {

    const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    console.log(baseUrl);
    const socket = useSocket()  

    const [description, setDescription] = useState('');
    const { data: session, status } = useSession();
    const { user } = session;


    useEffect(()=> {
        setDescription(apptDetails.description)
    }, [apptDetails])
    
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

    
    const config = useMemo(() => ({
        license: 'B74F2-13481-A9NJJ-97M9Z',
        readonly: false,
        toolbar: true,
        uploader: {
            url: `${process.env.NEXT_PUBLIC_STORAGE_FILE_URL}/api/storage/upload/`,  // URL to handle the file upload
            method: 'POST',
            format: 'json',
            filesVariableName: () => "file",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_BEARER_TOKEN}`, // Add Bearer token here
            },
        },
    }), []);
    
    return (
        <div>
            <JoditEditor
                config={config} 
                value={description}
                onChange={(newdescription) => setDescription(newdescription)}
            />

            <button type="submit" 
                onClick={handleUpdate} 
                className="bg-clirxColor mt-3 text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor">Submit Changes</button>
        </div>
    )
}

export default ApptForm