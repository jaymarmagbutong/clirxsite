'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });



const UpdatePageForm = ({attachments,  category, status, pageDetails}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [id, setId]= useState('');
    const [page, setPage] = useState([])

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (pageDetails && pageDetails.pages) {
            const page = pageDetails.pages;
            setId(page.id || '');
            setTitle(page.title || '');
            setDescription(page.description || '');
            setReferenceNumber(page.reference_number || '');
        }
    }, [pageDetails]);


 
    const handleModelChange = (model) => {
        setDescription(model);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            id,
            title,
            description,
            attachments,
            category,
            referenceNumber,
            status
        };

        try {
            setLoading(true);
            const response = await fetch('/api/pages/update/', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                toast.success('Page Updated successfully!');
           
            } else {
                toast.error('Failed to update the page!');
            }
        } catch (error) {
            toast.error('Error occurred while updating page!');
        } finally {
            setLoading(false);
        }
    };
    const config = {
        readonly: false,
        toolbar: true,
        uploader: {
            insertImageAsBase64URI: true,
            url: '/api/upload/',
            method: 'POST',
            filesVariableName: () => "file",
            isSuccess: (resp) => {
                console.log("Upload success response:", resp);
                return resp.link; // Ensure this returns the correct image URL
            },
            process: function(resp) {
                return {
                    files: [{ url: resp.link }],
                };
            },
            onError: (error) => {
                console.error("Upload failed:", error);
                toast.error("Image upload failed");
            },
        },
    };
    
    

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                    Reference Number
                </label>
                <input
                    id="reference"
                    type="text"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    className="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                    
                />
            </div>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm mb-1 font-medium text-gray-700">
                    Description
                </label>
                <div className="flex flex-col">
                    <JoditEditor
                        config={config} 
                            value={description}
                            onChange={(newdescription) => setDescription(newdescription)}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="bg-clirxColor text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor"
            >
                {loading ? 'Updating...' : 'Update Page'}
            </button>
        </form>
    )
}

export default UpdatePageForm