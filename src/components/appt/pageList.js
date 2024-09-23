import React from 'react'
import { FaFileAlt, FaDownload, FaTrashAlt } from 'react-icons/fa';
import { formatDate } from '../../../libs/dateUtils';
import { CiEdit } from "react-icons/ci";
import { CiRead } from "react-icons/ci";
import Link from 'next/link';
const PageList = ({pageDetails}) => {
    
    return (
        <tr key={pageDetails.PageId} className="border-b">
            <td className="px-4 py-2 flex items-center">
                <FaFileAlt className="text-gray-500 mr-2" />
                <p>{pageDetails.PageTitle}</p>
                {/* <span className="ml-2 text-sm text-gray-400">({pageDetails.AccId})</span> */}
            </td>
            <td className="px-4 py-2 text-sm ">{formatDate(pageDetails.AccDateCreated)}</td>
            <td className="px-4 py-2 flex items-center justify-start space-x-2">

            <Link href={`/appt/page/${pageDetails.PageId} `}>
            <button className='flex items-center border px-1 rounded-sm'>
                  <CiRead color='green'/> <span className='text-[12px] ml-1'>Preview</span>  
            </button> </Link>
            <button className='flex items-center border px-1 rounded-sm'>
                     <CiEdit color='blue' /> <span className='text-[12px] ml-1'>Modify</span>  
            </button> 
           
    
        </td>
        </tr>
    )
}

export default PageList