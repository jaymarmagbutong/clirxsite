'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

// Dynamically import FroalaEditor with SSR disabled
const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
    ssr: false,
});



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
                toast.success('Page created successfully!');
           
            } else {
                toast.error('Failed to create page!');
            }
        } catch (error) {
            toast.error('Error occurred while creating page!');
        } finally {
            setLoading(false);
        }
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
                    <FroalaEditor
                        tag="textarea"
                        model={description}
                        onModelChange={handleModelChange}
                        config={{
                            heightMin: 400,
                            imageUploadURL: '/api/upload/',  // Route to handle image uploads
                        }}
                        style={{ width: '100%' }}
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