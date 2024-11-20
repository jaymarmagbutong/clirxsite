import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

export default function ImageSelectorModal({ isOpen, onRequestClose, onSelectImage }) {
    const [images, setImages] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Only set to true when we're on the client
        setIsClient(true);
        Modal.setAppElement('body');
    }, []);

    useEffect(()=> {
        const fetchImageList = async () => {
            try {
                const res = await fetch('/api/image/');
                if (res.ok) {
                    const data = await res.json();
                    setImages(data.images);
                } else {
                    console.log("Failed to fetch the data");
                }
            } catch (error) {
                console.log("Error Fetching Images");
            }
        }

        fetchImageList();
    }, [onSelectImage]);

    const customStyles = {
        content: {
            width: '900px',
            margin: 'auto',
            padding: '20px',
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            backGround: 'black',
        },
    };

    // Ensure the modal is only rendered on the client
    if (!isClient) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <h2>Select an Image</h2>
            <div>
                <div className='flex flex-wrap'>
                    {images.length > 0 ? (
                        images.map((src, index) => (
                            <div key={index} className="w-40 h-40 overflow-hidden m-1 bg-gray-100 border border-gray-300 flex flex-wrap justify-center items-center">
                                <Image
                                    src={src.url}
                                    alt={`Image ${index}`}
                                    width={388}
                                    height={388}
                                    className="object-cover"
                                    style={{ objectFit: 'cover' }}
                                    onClick={() => { onSelectImage(src.url); }}
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
