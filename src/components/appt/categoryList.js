import React, {useState,useEffect } from 'react'
import { TbNotes } from "react-icons/tb";
import Link from 'next/link';
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";


const CategoryList = ({ title, pages, searchTerm, autoOpen }) => {

    const [openCat, setOpenCat] = useState(false);
    const pageLists = Array.isArray(pages) ? pages : [];
    
    // Filter pages based on search term
    const filteredPages = pageLists.filter((page) =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                            {page.status === 1 ? (
                                <div className="flex items-center justify-between w-full">
                                   <Link href={`/page/view/${page.id}`} className="flex items-center pl-3">
                                        <TbNotes size={20} className="mr-3" /> {page.title}
                                    </Link>
                                    {/* <Link href={`/manual/contents/page/${page.id}`} className="flex items-center pl-3">
                                        <TbNotes size={20} className="mr-3" /> {page.title}
                                    </Link>

                                    { page.interaction_count > 0 && (
                                        <div className="flex items-center gap-1">
                                            <div className="px-3 flex gap-1 ">
                                               
                                                    <FaUsers size={18} color="orange" /> <span className="text-sm font-semibold">{page.interaction_count}</span>
                                             
                                            </div>

                                            <div className="px-3 flex gap-1 ">
                                               
                                                    <RiMailSendLine size={18} color="green"/> <span className="text-sm font-semibold">{page.sent_count}</span>
                                            
                                            </div>
                         
                                        </div>
                                        
                                        
                                    )} */}
                                  
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
    )


}

export default CategoryList