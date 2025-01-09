'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
// Dynamically import FroalaEditor with SSR disabled
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-pro-react'), { ssr: false });

export default function CreateFormPage({ attachments, category, status }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter(); // Initialize the router
    const userCreatedId = session?.user?.id;
    const editor = useRef(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title,
            description,
            attachments,
            category,
            referenceNumber,
            userCreatedId,
            status
        };

        try {
            setLoading(true);
            const response = await fetch('/api/pages/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                toast.success('Page created successfully!');
                setTitle('');
                setDescription('');  // Clear Froala editor by setting the description to an empty string
                setReferenceNumber('');
                router.push('/page');
            } else {
                toast.error('Failed to create page!');
            }
        } catch (error) {
            toast.error('Error occurred while creating page!');
        } finally {
            setLoading(false);
        }
    };

    const config = useMemo(() => ({
        license: 'C0522-23FK2-A96KK-2R1CX',
        readonly: false,
        toolbar: true,
        uploader: {
          url: '/api/upload/',  // URL to handle the file upload
          method: 'POST',
          format: 'json',
          filesVariableName: () => "file",
       
        },
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
                    required
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
                        ref={editor}
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
                {loading ? 'Saving...' : 'Create Page'}
            </button>
        </form>
    );
}
