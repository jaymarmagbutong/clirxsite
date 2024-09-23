import React, {useState} from 'react'
import { FaFolder, FaFolderOpen  } from "react-icons/fa";
const CategoryList = ({ title, cat_id, pages, callback, selected }) => {
    const [openCat, setOpenCat] = useState(false);





    const handleClick = () => {
        callback(pages, cat_id)
        setOpenCat(!openCat)
    }



    return (
        <div className='cursor-pointer' onClick={handleClick}>
            
            <div  className={`rounded  relative flex items-center justify-center h-24 ${selected ? 'bg-gray-300' : 'bg-gray-50'}`}>

                { 
                    (selected) ?  <FaFolderOpen size={40} color='#f79012' /> :   <FaFolder size={40} color='#f79012' />
                }
              
            </div>

            <p className='text-sm mt-2'>{title}</p>


        </div>
    )


}

export default CategoryList