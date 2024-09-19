import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function ImageSelectorModal({ isOpen, onRequestClose, onSelectImage }) {
    const [images, setImages] = useState([]);

    useEffect(()=> {

        console.log('test')
        const fetchImageList = async () => {
            try {
                const res = await fetch('/api/image/');
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
    }, [onSelectImage]);



    const customStyles = {
        content: {
          width: '900px', // Set your desired width here
          margin: 'auto', // Centers the modal
          padding: '20px', // Optional padding inside the modal
          top: '40%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)', // Centers the modal
          backGround: 'black',
        },
      };
    
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
        <h2>Select an Image</h2>
        <div>
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
                            onClick={() => {onSelectImage(src)}}
                        />
                        </div>
                    ))
                ) : (
                    <p>No Image to show</p>
                )}
            </div>
        </div>
        <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}


