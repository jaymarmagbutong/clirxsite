import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegFolder } from 'react-icons/fa';
import { FaRegFolderOpen } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
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
                        <Link href={`/manual/contents/page/${page.id} `} key={index} className='flex items-center pl-3 w-full bg-gray-50 py-3 border-b border-dashed text-sm text-clirxColor'> <TbNotes size={20} className='mr-3'/> {page.title}</Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryItem;


// import Link from 'next/link';
// import React, { useState } from 'react';
// import { FaRegFolder, FaRegFolderOpen } from 'react-icons/fa';
// import { TbNotes } from 'react-icons/tb';

// const CategoryItem = ({ category }) => {
//     const [openCat, setOpenCat] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedName, setEditedName] = useState(category.name);
//     const [loading, setLoading] = useState(false);

//     const pages = Array.isArray(category.pages) ? category.pages : [];

//     // Function to handle saving the edited name
//     const handleSave = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`/api/category/update/${category.id}`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name: editedName }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update category');
//             }

//             setIsEditing(false);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <li 
//                 onClick={() => setOpenCat(!openCat)} 
//                 className={`p-4 border-t border-gray-200 text-lg flex items-center cursor-pointer hover:bg-blue-50 ${openCat ? 'bg-blue-50' : ''}`}
//             >
//                 {openCat ? <FaRegFolderOpen className='mr-2' /> : <FaRegFolder className='mr-2' />}

//                 {/* Inline edit functionality */}
//                 {isEditing ? (
//                     <div className="flex items-center">
//                         <input
//                             type="text"
//                             value={editedName}
//                             onChange={(e) => setEditedName(e.target.value)}
//                             className="border-b-2 border-blue-500 outline-none px-2"
//                         />
//                         <button onClick={handleSave} disabled={loading} className="ml-2 text-green-600">
//                             Save
//                         </button>
//                         <button onClick={() => setIsEditing(false)} className="ml-2 text-red-600">
//                             Cancel
//                         </button>
//                     </div>
//                 ) : (
//                     <span onDoubleClick={() => setIsEditing(true)}>{category.name}</span>
//                 )}
//             </li>
//             {pages.length > 0 && openCat && (
//                 <div className='ml-8'>
//                     {pages.map((page, index) => (
//                         <Link
//                             href={`/manual/contents/page/${page.id}`}
//                             key={index}
//                             className='flex items-center pl-3 w-full bg-gray-50 py-3 border-b border-dashed text-sm text-clirxColor'
//                         >
//                             <TbNotes size={20} className='mr-3' />
//                             {page.title}
//                         </Link>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CategoryItem;
