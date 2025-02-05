"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LiaSwatchbookSolid } from "react-icons/lia";
import { MdPostAdd, MdOutlinePermMedia, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { TbUsers } from 'react-icons/tb';
import { CiCircleChevDown, CiCircleChevUp } from 'react-icons/ci';
import { CiViewList } from "react-icons/ci";
import { SiPowerpages } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";

const iconMapping = {
    LiaSwatchbookSolid: LiaSwatchbookSolid,
    MdPostAdd: MdPostAdd,
    MdOutlinePermMedia: MdOutlinePermMedia,
    MdOutlineAdminPanelSettings: MdOutlineAdminPanelSettings,
    TbUsers: TbUsers,
    CiViewList: CiViewList,
    SiPowerpages: SiPowerpages,
    BiCategoryAlt: BiCategoryAlt
};

const MenuItem = ({ href, icon: iconName, label, exact = false, submenu = [] }) => {
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false); // Independent toggle state for each menu

    const Icon = iconMapping[iconName];

    const handleToggle = () => {
        setIsExpanded((prev) => !prev); // Toggle only this menu's expanded state
    };


    return (
        <div className="flex flex-col mt-2">
            {/* Parent menu clickable/non-clickable area */}
            <div
                className={`flex items-center justify-between gap-4 py-2 rounded-sm hover:bg-gray-100 hover:text-gray-700 md:px-2 ${isExpanded ? 'bg-gray-200 font-bold text-gray-700' : 'text-white'
                    }`}
                onClick={submenu.length > 0 ? handleToggle : undefined} // Toggle submenu if it exists
            >
                {/* Render non-clickable div if submenu exists */}
                {submenu.length > 0 ? (
                    <div className="flex w-full items-center justify-center md:justify-start gap-4 cursor-pointer">
                        {Icon && <Icon className="text-[20px]" />}
                        <span className="hidden lg:block">{label}</span>
                    </div>
                ) : (
                    // Render Link if no submenu
                    <Link href={href} className="flex w-full items-center justify-center md:justify-start gap-4">
                        {Icon && <Icon className="text-[20px]" />}
                        <span className="hidden lg:block">{label}</span>
                    </Link>
                )}

                {/* Submenu toggle indicator */}
                {submenu.length > 0 && (
                    <span className="hidden md:block text-gray-400">
                        {isExpanded ? <CiCircleChevUp className="text-[20px]" /> : <CiCircleChevDown className="text-[20px]" />}
                    </span>
                )}
            </div>

            {/* Render submenu items if expanded */}
            {submenu.length > 0 && isExpanded && (
                <ul className="pl-6">
                    {submenu.map((subItem, index) => (
                        <li
                            key={index}
                            className={`my-2 p-2 pl-3 rounded-md ${pathname === subItem.href ? 'font-bold text-white text-md' : 'text-white text-sm'
                                }`}
                        >
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
