"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LiaSwatchbookSolid } from "react-icons/lia";
import { MdPostAdd, MdOutlinePermMedia, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { TbUsers } from 'react-icons/tb';
import { CiCircleChevDown, CiCircleChevUp } from 'react-icons/ci';
import { CiViewList } from "react-icons/ci";
import { SiPowerpages } from "react-icons/si";
const iconMapping = {
  LiaSwatchbookSolid: LiaSwatchbookSolid,
  MdPostAdd: MdPostAdd,
  MdOutlinePermMedia: MdOutlinePermMedia,
  MdOutlineAdminPanelSettings: MdOutlineAdminPanelSettings,
  TbUsers: TbUsers, 
  CiViewList:CiViewList,
  SiPowerpages:SiPowerpages
  // Add other icons here if needed
};

const MenuItem = ({ href, icon: iconName, label, exact = false, submenu = [], onToggle, isExpanded }) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  const Icon = iconMapping[iconName]; // Get the correct icon component

  return (
    <div className={`flex flex-col mt-2`}>
      {/* Parent item clickable area */}
      <div className={`flex w-full items-center justify-between lg:justify-start gap-4  py-2 hover:bg-gray-100 hover:text-gray-700 rounded-md md:px-2 ${isActive ? 'bg-gray-200 font-bold text-gray-700' : 'text-white '}`} onClick={submenu.length > 0 ? onToggle : undefined}>
        <Link href={href} className="flex w-full items-center justify-center md:justify-start gap-4">
          {Icon && <Icon className='text-[20px]' />} {/* Conditionally render the icon */}
          <span className="hidden lg:block">{label}</span>
        </Link>
        {/* Submenu toggle indicator */}
        {submenu.length > 0 && (
          isExpanded ? <CiCircleChevUp className='text-gray-400 text-[20px] hidden md:block' size={30} /> : <CiCircleChevDown size={30} className='text-gray-400 hidden md:block text-[20px]' />
        )}
      </div>
      {/* Render submenu items if expanded */}
      {submenu.length > 0 && isExpanded && (
        <ul className="pl-6">
          {submenu.map((subItem, index) => (
            <li key={index} className={` my-2 p-2 pl-6 rounded-md ${pathname === subItem.href ? 'bg-gray-200 font-bold text-gray-700' : 'text-white'}`}>
              <Link href={subItem.href} className="flex items-center gap-2">
                <span>{subItem.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuItem;
