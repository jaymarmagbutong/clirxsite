'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
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
const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
  ssr: false,
});
export default function CreateFormPosts({attachments}) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleModelChange = (model) => {
    setDescription(model);
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const postData = {
      title,
      description,
      attachments 
    };


    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const results = await response.json();
      console.log('Post Created Successfully', results);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <FroalaEditor
            tag="textarea"
            model={description}
            onModelChange={handleModelChange}
            
            className="h-screen"
            config={{
              heightMin: 400, 
            }}
          />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Post
      </button>
  
    </form>
  );
}
