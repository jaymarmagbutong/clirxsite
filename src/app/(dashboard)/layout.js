
import React from 'react'
import Sidebar from '@/components/sidebar/sidebar'
import Navbar from '@/components/navbar'
import { getServerSession } from 'next-auth';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader'



export const metadata = {
  title: "Dashboard",
  description: "This is just a local testing site",
};


const DashboardLayout = async  ({children}) => {

  const session = await getServerSession();

  return (
    
    <div className="h-screen flex">
      <NextTopLoader
        color="#2299DD"
        initialPosition={0.08}
        crawlSpeed={200}
        height={5}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
        {/* Leaf  t */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] p-4  border-gray-200 border-r  bg-clirxColor">
            <Sidebar/>
        </div>

        <div className="w-[86%] md:w-[92%] lg:w-[84%] bg-gray-100 overflow-scroll">
            <Navbar profile={session}/>
            <div className='sm:py-4 sm:px-3 md:py-11 md:px-10'>
              {children}
            </div>
            
        </div>
        <Toaster/>
  </div>
  )
}

export default DashboardLayout