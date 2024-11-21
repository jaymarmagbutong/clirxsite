import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../libs/dateUtils';


export default function   ActivityPage({ appt_response, modalAction, setModalContent }) {


  const [apptResponse, setApptResponse] = useState([]);

  useEffect(() => {
    if (appt_response) {
      setApptResponse(appt_response);
    }
  }, [appt_response]);


  const setModalAction = (vals) => {
    modalAction()
    setModalContent(vals)
  }

  if(appt_response==''){
    return (
      <></>
    )
  }

  
  return (
    <div className="rounded-md shadow-sm mt-3 bg-white p-4  dark:bg-gray-800">
      <h1 className="font-bold text-2xl mb-4">Page Status</h1>
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {/* Timeline Item 1 */}

      {
        apptResponse.map((activity, index) => (
          <li className="mb-5 ml-4" key={index}>
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{formatDate(activity.response_created)}</time>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              <span className="text-clirxColor">{activity.username}</span> has change the content
            </h3>
      {/* 
            <div dangerouslySetInnerHTML={{ __html: trimHtml(activity.response, 30) }} />
    */}
  
            <button
              onClick={() => setModalAction(activity)}
              className="inline-flex items-center px-3 mt-3 py-1 text-sm font-thin text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Review
        
            </button>
        </li>
        ))
      }

    </ol>
  </div>


  );
}
