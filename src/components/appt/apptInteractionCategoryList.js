
import React, {useState,useEffect } from 'react'
import { TbNotes } from "react-icons/tb";
import Link from 'next/link';
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";


const ApptInteractionCategoryList = ({ title, pages, searchTerm, autoOpen }) => {

    const [openCat, setOpenCat] = useState(true);
    const pageLists = Array.isArray(pages) ? pages : [];
    
    // Filter pages based on search term
    const filteredPages = pageLists.filter((page) =>
        page.PageTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
        // If the search term changes, automatically open the category if it matches
        useEffect(() => {
            if (autoOpen) {
                setOpenCat(true);
            }
        }, [autoOpen]);
    
    return (
        <div >

            <li
                onClick={() => setOpenCat(!openCat)}
                className={`p-4 border-t border-gray-200 text-lg flex items-center cursor-pointer hover:bg-blue-50 ${openCat ? "bg-blue-50" : ""}`}
            >
                {openCat ? <FaRegFolderOpen className="mr-2" /> : <FaRegFolder className="mr-2" />}
                {title}
            </li>

            {filteredPages.length > 0 && openCat && (
                <div className="ml-8">
                    {filteredPages.map((page, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 py-3 border-b border-dashed text-sm text-clirxColor">
                            {page.PageStatus === 1 ? (
                                <div className="flex items-center justify-between w-full">
                                   <Link href={`/appt-interaction/page/${page.PageId}`} className="flex items-center pl-3">
                                        <TbNotes size={20} className="mr-3" /> {page.PageTitle}
                                    </Link>
                                  
                                </div>
                            ) : (
                                <p className="flex items-center pl-3 w-full text-gray-300">
                                    <TbNotes size={20} className="mr-3" /> {page.PageTitle}
                                </p>
                            )}

                        </div>
                    ))}
                </div>
            )}
            


        </div>
    )


}

export default ApptInteractionCategoryList