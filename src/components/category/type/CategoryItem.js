import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { MdEditNote, MdDelete } from "react-icons/md";

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
                <Link href={`/manual/contents/page/${page.id}`} className="flex items-center pl-3 w-full">
                  <TbNotes size={20} className="mr-3" /> {page.title}
                </Link>
              ) : (
                <p className="flex items-center pl-3 w-full text-gray-300">
                  <TbNotes size={20} className="mr-3" /> {page.title}
                </p>
              )}
              <div className="text-base gap-2 flex px-3 items-center">
                <Link href={`/manual/contents/page/modify/${page.id}`} className="cursor-pointer">
                  <MdEditNote size={25} />
                </Link>
                <span className="cursor-pointer">
                  <MdDelete size={20} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
