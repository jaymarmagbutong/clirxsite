'use client';
import React, { useState } from 'react';
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


export default function createFormPage({attachments, category}) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [referenceNumber, setSeferenceNumber] = useState('');
  const [loading, setLoading ] = useState(false);


  const handleModelChange = (model) => {
    setDescription(model);
  };

  const handleSubmit = async (e) => {


    e.preventDefault();
    const postData = {
      title,
      description,
      attachments,
      category,
      referenceNumber
    };

    try {
      setLoading(true)
      const response = await fetch('/api/pages/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      console.log(response)

      if (response.ok) {
              toast.success('Post saved successfully!');
      } else {

        toast.error('Cant saved!');
      }


    } catch (error) {
      toast.error('Cant saved!');
    } finally {
      setLoading(false)
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
          onChange={(e) => setSeferenceNumber(e.target.value)}
          className="mt-1 block w-20 px-3 py-2 border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
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
          className="mt-1 block w-full px-3 py-2 border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm  mb-1 font-medium text-gray-700">
          Description
        </label>
        <div  className="flex flex-col">
          {/* <ReactQuill formats={formats} onChange={handleChange} modules={modules} value={description} style={{ minHeight: '400px' }} /> */}

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

      </div>
      <button
        type="submit"
        className="bg-clirxColor text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor"
      >
        {(loading) ? 'Saving...' : 'Create Page'}
      </button>
  
    </form>
  );
}
