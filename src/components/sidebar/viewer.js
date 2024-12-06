import React from 'react'
import { FaBook } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { IoMdNotificationsOutline } from "react-icons/io";

const viewer = () => {
  return (
    <div className='drop-shadow-sm '>
      <div className='pb-6'>
        <Image src="/img/site-logo.png"  alt="Logo" width={210} height={210} priority/>
      </div>
      <ul className='flex flex-col border-t border-clirxLightColor pt-5'>
      <div className={`flex flex-col mt-2`}>
      {/* Parent item clickable area */}
      <div className={`flex w-full items-center text-white  justify-between lg:justify-start gap-4  py-2 hover:bg-gray-100 hover:text-gray-700 rounded-md md:px-2`}>
        <Link href={'/appt-manual'} className="flex w-full items-center justify-center md:justify-start gap-4">
          <FaBook/>
          <span className="hidden lg:block">Appt Manual</span>
        </Link>
      </div>
      <div className={`flex w-full items-center text-white  justify-between lg:justify-start gap-4  py-2 hover:bg-gray-100 hover:text-gray-700 rounded-md md:px-2`}>
        <Link href={'/appt-interaction'} className="flex w-full items-center justify-center md:justify-start gap-4">
          <FaBook/>
          <span className="hidden lg:block">Appt Interaction</span>
        </Link>
      </div>

      <div className={`flex w-full items-center text-white  justify-between lg:justify-start gap-4  py-2 hover:bg-gray-100 hover:text-gray-700 rounded-md md:px-2`}>
        <Link href={'/annoucements'} className="flex w-full items-center justify-center md:justify-start gap-4">
          <IoMdNotificationsOutline size={20}/>
          <span className="hidden lg:block">Annoucements</span>
        </Link>
      </div>


    </div>
      </ul>
    </div>
  )
}

export default viewer