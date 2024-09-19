"use client"
import CategoryForm from '@/components/forms/createCategory';
import Breadcrumbs from '@/components/breadcrumbs';
import CategoryOption from '@/components/category/categoryOption';
import { useState } from 'react';
import BackButton from '@/components/backButton';

export default function Page() {

  const [isCategory, setIsCategory] = useState(0);

  const triggerCategory = () => {
    setIsCategory(isCategory + 1);
  }

  



  return (
    <>
    <div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-md'>
        <div>
          <h1 className='font-bold text-2xl'>Add Category</h1>
          <Breadcrumbs/>
        </div>
        <div>
          <BackButton/>
        </div>
    </div>



      <div className='grid grid-cols-12 md:grid-cols-4 gap-4 mt-5'>
        
        <div className='col-span-12 md:col-span-2 '>
          <CategoryForm triggerResponse={triggerCategory}/>
        </div>

        <div className='col-span-12  md:col-span-2'>
          <div className='bg-white  rounded-md p-4'>

              <div className='font-bold pb-4 relative'>Category List</div>
              
              < CategoryOption isCategory={isCategory} />

           
          </div>
        </div>

      </div>

    </>
  );

  
}
