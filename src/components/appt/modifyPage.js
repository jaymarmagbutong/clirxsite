'use client'
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FiEdit } from "react-icons/fi";
import ApptForm from '../forms/apptForm';
import toast from 'react-hot-toast';


const ModifyPage = ({content, title, apptDetails}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);
    const [isHorizontal, setIsHorizontal] = useState(false); // Toggle for horizontal/vertical view


    // Functions to open and close the modal
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    useEffect(() => {
        // Setting the app element to 'body' when the component mounts
        Modal.setAppElement('body');
      }, []); 


    const handleRequestClose = () => {
      closeModal();
        
    };



    return (
        <div className=''>
            <button onClick={openModal} className="bg-blue-500 text-white px-2 py-1 rounded flex justify-center items-center">
                <FiEdit/> <span className='ml-2'> Modify</span>
            </button>

            <Modal
       
                isOpen={modalIsOpen}
                onRequestClose={handleRequestClose}
                contentLabel="Example Modal"
                className="bg-white shadow-lg max-w-full max-h-full overflow-y-scroll"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                closeTimeoutMS={500}
            >
                <div className='bg-gray-100'>
                    <div className='border-b-2 mb-2 p-4  bg-gray-400'>
                        {/* Button to toggle horizontal and vertical view */}
                        <button
                            onClick={() => setIsHorizontal(!isHorizontal)}
                            className="bg-gray-200 px-4 py-2 rounded mt-2 mb-4"
                        >
                            Toggle to {isHorizontal ? 'Vertical' : 'Horizontal'} View
                        </button>
                        
                    </div>

                    <div className={isHorizontal ? 'flex gap-3 flex-col-reverse' : 'grid grid-cols-2 gap-3'}>
                        <div className='p-4'>
                            <h1 className='font-bold text-2xl'>{title}</h1>
                            <div className='border bg-white p-4 mt-6 shadow-sm'
                                dangerouslySetInnerHTML={{ __html: content }} 
                            />
                        </div>
                        <div  className={isHorizontal ? 'mb-9 p-4' : 'mt-0 p-4'}>
                            <h1 className='font-bold text-2xl'>{title}</h1>
                            <div className='mt-5'>
                                <ApptForm contents={content} apptDetails={apptDetails}  />
                            </div>
                        </div>
                    </div>
                    <div className='w-full border-t-2 p-4 bg-gray-400'>
                       <button onClick={handleRequestClose} className="bg-white bg-transparent border px-4 py-2 rounded ">Close Modal</button>
                    </div>
                   
                </div>
                
            </Modal>
        </div>
    );
};

export default ModifyPage;
