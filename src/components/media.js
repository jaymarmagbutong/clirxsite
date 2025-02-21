'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Media({ onUploadSuccess }) {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [submitLabel, setSubmitLabel] = useState('Upload');

  const MAX_FILE_SIZE_MB = 50;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`File size exceeds the ${MAX_FILE_SIZE_MB}MB limit.`);
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      setSelectedFile(file);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploadProgress(0);
      const formData = new FormData();
      formData.append('file', selectedFile);
      setSubmitLabel('Uploading...')
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData, 
        });
 
  
        if (res.ok) {
          const data = await res.json();
          setImages([...images, data.filePath]);
          setPreview(null);
          setSelectedFile(null);
          setSubmitLabel('Upload')
          setError(null);
          setUploadProgress(100); // Simulate progress
          onUploadSuccess()
        } else {
          const errorData = await res.json();
          setError(errorData.error || 'Upload failed.');
        }
      } catch (err) {
        setError('Something went wrong during the upload.');
      }
    }
  };

  return (
    <div className="flex items-start justify-center">
      <div className="bg-white rounded-lg shadow-sm p-6  w-[300px]">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload Files</h1>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center mb-4 flex-col">
          <p className="text-gray-600 mb-3">Drag files to upload</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer block w-32 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Browse Files
          </label>
          {/* <p className="text-sm text-gray-500 mt-2">
            Max file size: {MAX_FILE_SIZE_MB}MB | Supported types: JPG, PNG, GIF, PDF, SVG
          </p> */}
        </div>

        {preview && (
          <div className="flex flex-col items-center">
            <Image src={preview} alt="Preview" width={300} height={300} className="rounded-md mb-2" />
            <button
              onClick={handleUpload}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {submitLabel}
            </button>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm mt-2">
            <p>{error}</p>
          </div>
        )}

        {uploadProgress > 0 && (
          <div className="mt-4 w-full">
            <div className="h-2 bg-gray-200 rounded-md overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Upload progress: {uploadProgress}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
