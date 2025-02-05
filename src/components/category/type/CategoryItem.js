import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { RiMailSendLine } from "react-icons/ri";
import { FaComment } from "react-icons/fa";


import { FaUsers } from "react-icons/fa6";
const CategoryItem = ({ category, searchTerm, autoOpen }) => {
    const [openCat, setOpenCat] = useState(autoOpen); // Initialize open state based on autoOpen prop
    const pages = Array.isArray(category.pages) ? category.pages : [];

    // Filter pages based on search term
    const filteredPages = pages.filter((page) =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // If the search term changes, automatically open the category if it matches
    useEffect(() => {
        if (autoOpen) {
            setOpenCat(true);
        }
    }, [autoOpen]);

    return (
        <div>
            <li
                onClick={() => setOpenCat(!openCat)}
                className={`p-4 border-t border-gray-200 text-lg flex items-center cursor-pointer hover:bg-blue-50 ${openCat ? "bg-blue-50" : ""}`}
            >
                {openCat ? <FaRegFolderOpen className="mr-2" /> : <FaRegFolder className="mr-2" />}
                {category.name}
            </li>
            {filteredPages.length > 0 && openCat && (
                <div className="ml-8">
                    {filteredPages.map((page, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 py-3 border-b border-dashed text-sm text-clirxColor">
                            {page.status === 1 ? (
                                <div className="flex items-center justify-between w-full">
                                    <Link href={`/manual/contents/page/${page.id}`} className="flex items-center pl-3">
                                        <TbNotes size={20} className="mr-3" /> {page.title}
                                    </Link>

                                    {  (page.comment_count > 0 || page.sent_count > 0 || page.comment_count > 0) && (
                                        <div className="flex items-center gap-1">

                                            {(page.comment_count > 0) && (
                                                <div className="px-3 flex gap-1 ">
                                                    <FaComment size={18} color="green" /> <span className="text-sm font-semibold">{page.comment_count}</span>
                                                </div>
                                            )}
                                        
                                            {(page.interaction_count > 0) && (
                                                 <div className="px-3 flex gap-1 ">
                                                    <FaUsers size={18} color="orange" /> <span className="text-sm font-semibold">{page.interaction_count}</span>
                                                </div>
                                            )}
                                           
                                           {(page.sent_count > 0) && (
                                                <div className="px-3 flex gap-1 ">
                                                    <RiMailSendLine size={18} color="green"/> <span className="text-sm font-semibold">{page.sent_count}</span>
                                                </div>
                                            )}
                                           
                         
                                        </div>
                                        
                                        
                                    )}
                                  
                                </div>
                            ) : (
                                <p className="flex items-center pl-3 w-full text-gray-300">
                                    <TbNotes size={20} className="mr-3" /> {page.title}
                                </p>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryItem;
