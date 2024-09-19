'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const imageList = ({ refreshTrigger }) => {
    const [images, setImages] = useState([]);
    useEffect(()=> {
        const fetchImageList = async () => {
            try {
                const res = await fetch('api/image/');
                if(res.ok){
                    const data = await res.json();
                    setImages(data.images);
                } else {
                    console.log("Failed to fetch the data");
                }
            } catch (error){
                console.log("Error Fetching Images");
            }
    
    
           
        }

        fetchImageList();  
    }, [refreshTrigger]);

 
  return (
    <div>
        <h1> This is Image Gallery</h1>
        <div className='flex flex-wrap'>

        {images.length > 0 ? (  
            images.map((src, index) => (
                <div  key={index}   className="w-40 h-40 overflow-hidden m-1 bg-gray-100 border border-gray-300 flex flex-wrap justify-center items-center"  >
                    <Image 
                        src={src} 
                        alt={`Image ${index}`} 
                        width={388} 
                        height={388} 
                        className="object-cover" 
                        style={{ objectFit: 'cover' }}
                    />
                    </div>
                ))
            ) : (
                <p>No Image to show</p>
            )}
        </div>
    </div>
  )
}

export default imageList