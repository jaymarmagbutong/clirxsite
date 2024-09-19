'use client'
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FiEdit } from "react-icons/fi";
import ApptForm from '../forms/apptForm';
import toast from 'react-hot-toast';


const ModifyPage = ({content, title}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true); // Example of tracking unsaved changes
    // Functions to open and close the modal
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    

    const handleRequestClose = () => {
        if (hasUnsavedChanges) {
          // Trigger a toast for confirmation
          toast((t) => (
            <span>
              Are you sure you want to close this? You can save your work first.
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    toast.dismiss(t.id); // Dismiss the toast
                    closeModal(); // Close the modal
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Yes, Close
                </button>
                <button
                  onClick={() => toast.dismiss(t.id)} // Just dismiss the toast if canceled
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </span>
          ));
        } else {
          closeModal(); // Close directly if no unsaved changes
        }
      };

      
  return (
        <div>
          <button onClick={openModal} className="bg-blue-500 text-white px-2 py-1 rounded flex justify-center items-center">
                <FiEdit/> <span className='ml-2'> Modify</span>
            </button>

        <Modal
        
            isOpen={modalIsOpen}
            onRequestClose={handleRequestClose}// Close modal when clicking outside or pressing ESC
            contentLabel="Example Modal"
            className="bg-white p-6  shadow-lg max-w-full max-h-full overflow-y-scroll"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            closeTimeoutMS={500}
            
        >
            
            <div className='grid grid-cols-2 gap-5'>
            
                <div> 
                    <h1 className='font-bold text-3xl'>{title}</h1>
                    <div className='border p-4 mt-6 shadow-md'
                        dangerouslySetInnerHTML={{ __html: content }} 
                    />
                </div>
                <div >
                    <h1 className='font-bold text-3xl'>{title}</h1>
                    <div className='mt-5'>
                        <ApptForm/>
                    </div>
                  
                </div>
            </div>
            <button onClick={handleRequestClose} className="bg-transparent border px-4 py-2 rounded mt-4"> Close Modal </button>
      </Modal>
    </div>
  )
}

export default ModifyPage 