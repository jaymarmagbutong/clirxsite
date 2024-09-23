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



const ApptForm = ({contents}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(contents);
    const [loading, setLoading ] = useState(false);
  
  
    const handleModelChange = (model) => {
      setDescription(model);
    };
  
  return (
    <div>
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
  )
}

export default ApptForm