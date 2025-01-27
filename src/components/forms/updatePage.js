'use client';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
const JoditEditor = dynamic(() => import('jodit-pro-react'), { ssr: false });



const UpdatePageForm = ({attachments,  category, status, pageDetails}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [id, setId]= useState('');

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
        }
        
    }), []);
    

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