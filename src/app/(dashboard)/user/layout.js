import React from 'react'
import Breadcrumbs from '@/components/breadcrumbs'
import BackButton from '@/components/backButton'
import { FiPlus } from "react-icons/fi";
import Link from 'next/link';


const layout = ({children}) => {
  return (
    <div>
          <div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-sm'>
            <div>
            <h1 className='font-bold text-2xl'>User</h1>
            <Breadcrumbs/>
            </div>
            <div className='flex space-x-2'>
                <div className='p-3 rounded-full shadow-lg cursor-pointer ' >
                    <Link href="/user/create"><FiPlus size={20} /></Link>
                </div>

                <BackButton/>
            </div>
        </div>

        {children}
    </div>
  )
}

export default layout