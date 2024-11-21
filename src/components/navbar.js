"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineMessage } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from 'next-auth/react'
import Link from 'next/link';
import { useSession } from "next-auth/react";
import NotificationAdmin from './notification/NotificationAdmin';


const Navbar = ({ profile }) => {
    const { data: session, status } = useSession();
    const role = parseInt(session?.user?.role);


    const userRole = {
        1: 'Admin',
        2: 'Editor',
        3: 'Viewer'
    }


    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    };


    const [isDropdownOpenProfile, setIsDropdownOpenProfile] = useState(false);


    return (

        <div className='flex items-center justify-end  p-4 bg-white shadow-md'>

            {/* Search bar */}
            {/* <div className="hidden lg:flex items-center gap-2 text-sm rounded-full ring-[1.5px] px-2 ring-gray-300 ">
                <Image src="/img/search.png" alt='search' width={14} height={14} />
                <input type="text" placeholder='Search...' className='w-[200px] p-2 bg-transparent outline-none' />
            </div> */}

            {/* Icons and User */}
            <div className='flex items-center gap-6 justify-center'>
                <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
                    <AiOutlineMessage size={25} />
                </div>
                {/* Notification */}
                <NotificationAdmin/>
                <div className='flex flex-col'>
                    <span className='text-xs leading-3 font-medium'>{profile?.user.name}</span>
                    <span className='text-[10px] text-gray-500 text-right'>{userRole[session?.user?.role]}</span>
                </div>

                {/* User Icon with Dropdown */}
                <div className='relative'>


                    {profile?.user.image ? (
                        <Image
                            src={profile?.user.image}
                            alt="User Profile"
                            width={40}
                            height={40}
                            className="rounded-full cursor-pointer"
                            onClick={() => setIsDropdownOpenProfile(!isDropdownOpenProfile)}
                        />
                    ) : (
                        <FaUserCircle
                            className="text-clirxColor cursor-pointer"
                            size={40}
                            onClick={() => setIsDropdownOpenProfile(!isDropdownOpenProfile)}
                        />
                    )}

                    {isDropdownOpenProfile && (
                        <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50'>
                            <Link href="/profile" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' >
                                Profile
                            </Link>
                            {(role !== 3 && role !== 2) && (
                                <Link href="/settings" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                    Settings
                                </Link>
                            )}


                            <a onClick={handleLogout} className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'>Sign out</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
