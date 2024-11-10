import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegFolder } from 'react-icons/fa';
import { FaRegFolderOpen } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const CategoryItem = ({ category }) => {
    const [openCat, setOpenCat] = useState(false);
    const pages = Array.isArray(category.pages) ? category.pages : [];
    

    return (
        <div>
            <li 
                onClick={() => setOpenCat(!openCat)} 
                className={`p-4 border-t border-gray-200 text-lg flex items-center cursor-pointer hover:bg-blue-50 ${(openCat) ? 'bg-blue-50 ': ''} `}
            >
                {
                    (openCat) ? <FaRegFolderOpen  className='mr-2'  /> : <FaRegFolder className='mr-2' />
                }

                
                {category.name}
            </li>
            {pages.length > 0 && openCat && (
                <div className='ml-8'>
                    {pages.map((page, index) => (
                        <div  key={index} className='flex items-center justify-between bg-gray-50 py-3 border-b border-dashed text-sm text-clirxColor'>
                            <Link href={`/manual/contents/page/${page.id} `} key={index} className='flex items-center pl-3 w-full '> <TbNotes size={20} className='mr-3'/> {page.title}</Link>
                            <div className='text-base gap-2 flex px-3 items-center'>
                                <Link href={`/manual/contents/page/modify/${page.id} `} key={index} className='cursor-pointer'><MdEditNote size={25}/></Link>
                                <span className='cursor-pointer'><MdDelete size={20}/></span>
                            </div>
                        </div>
                    
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryItem;
