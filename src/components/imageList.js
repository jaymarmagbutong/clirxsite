'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const ImageList = ({ refreshTrigger }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImageList = async () => {
            try {
                const res = await fetch('/api/image'); // Ensure this API route exists on the server-side
                if (res.ok) {
                    const data = await res.json();
                    setImages(data.images || []); // Make sure 'images' exists in the response
                } else {
                    console.error("Failed to fetch the data from the server.");
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImageList();
    }, [refreshTrigger]); // Refresh images whenever 'refreshTrigger' changes

  return (
    <div>
     
        <div className='flex flex-wrap'>
            {images.length > 0 ? (
                images.map((image, index) => (
                    <div key={index} className="w-40 h-40 overflow-hidden m-1 bg-gray-100 border border-gray-300 flex justify-center items-center ">
                        <Image 
                            src={image.url} // Ensure 'url' exists in the image object
                            alt={`Image ${index}`} 
                            width={388} 
                            height={388} 
                            className="object-cover" 
                            style={{ objectFit: 'cover' }} 
                        />
                    </div>
                ))
            ) : (
                <p>No images to show</p>
            )}
        </div>
    </div>
  );
};

export default ImageList;
