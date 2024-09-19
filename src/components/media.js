'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Media({ onUploadSuccess }) {
  
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();


    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (file) {
      setSelectedFile(file);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImages([...images, data.filePath]);
        setPreview(null);
        setSelectedFile(null);
        onUploadSuccess();
      } else {
        console.error(data.error);
      }
    }
  };

  return (
    <div>
      <h1>Media Page</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div>
          <Image src={preview} alt="Preview" width={100} height={100} />
          <button onClick={handleUpload}>Add Image</button>
        </div>
      )}
    
    </div>
  );
}
