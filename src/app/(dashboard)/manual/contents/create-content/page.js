"use client"
import { useState } from 'react';
import ImageSelectorModal from '@/components/modals/ImageSelectorModal';
import Image from 'next/image';
import { FaPlusCircle } from "react-icons/fa";
import Breadcrumbs from '@/components/breadcrumbs';
import CreateFormPage from '@/components/forms/createPage';
import CategoryOption from '@/components/category/categoryOption';
import BackButton from '@/components/backButton';

export default function ContentCreate() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [attachment, setAttachment] = useState('');
  const [category, setCategory] = useState('');



  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }



  const handleImageSelection = (image) => {
    setAttachment(image); // Add selected image to the state
    closeModal(); // Close modal after selection (optional)
  };

  const getCatVal = (value) => {
    setCategory(value)
  }





  return (
    <>
    <div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-md'>
        <div>
          <h1 className='font-bold text-2xl'>Add Page</h1>
          <Breadcrumbs/>
        </div>
        <div>
          <BackButton/>
        </div>
    </div>

      
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        
        <div className='col-span-1 md:col-span-3'>
          
          <div className="w-full mt-5 p-4 bg-white rounded-md">

              <CreateFormPage 
                attachments={attachment}
                category={category}
              />
          </div>
        </div>

        <div className='mt-5'>
          <div className='bg-white  rounded-md p-4'>

            
        {/* this is for category */}
          <div className='mb-5'>
            <h4 className='font-bold mb-3'>Page Details</h4>

            <label htmlFor="title" className="block text-sm font-medium text-gray-700"> Category </label>
             <CategoryOption 
             params="options" 
             getValue={getCatVal}
             />
          </div>


            <button onClick={openModal} className='flex items-center justify-center bg-gray-200 px-2 p-1 rounded-lg'> <FaPlusCircle className='mr-2'/> Add Attachments</button> 
            <ImageSelectorModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              onSelectImage={handleImageSelection}
            />

            
            
              {attachment && (
                  <div
                    className="w-full h-60 overflow-hidden mt-2 bg-gray-100 border border-gray-300 flex flex-wrap justify-center items-center" 
                  >
                    <Image
                      src={attachment}
                      alt="Image"
                      width={388}
                      height={388}
                      className="object-cover "
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
          </div>


         
        </div>
      </div>

    </>
  );
}
