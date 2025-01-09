import React, { useState, useEffect } from 'react';

import { trimHtml } from '@/app/libs/trimHTML';

function AppResponse({ appt_response }) {
  const [apptResponse, setApptResponse] = useState([]);

  // Update state only when appt_response changes
  useEffect(() => {
    if (appt_response) {
      setApptResponse(appt_response);
    }
  }, [appt_response]);


  console.log(appt_response)

  if(appt_response==''){
    return (
      <></>
    )
  }

  return (
    <div className='w-full mt-5  p-4 bg-white rounded-md shadow-sm'>
        <h1 className='font-bold text-2xl'>APPT Response</h1>
      <div className="w-full mt-5">
        <div className="container mx-auto grid gap-2 grid-cols-4">
    
            {apptResponse && apptResponse.map((card, index) => (
              <div key={index} className="py-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* <Image
                    src='/img/card.jpg'
                    alt={card.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  /> */}
                  <div className="p-4 jodit-wysiwyg">
                    <p className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{card.username}</p>
                    <h3 className="text-lg font-semibold mb-2">{card?.title}</h3>

                    <div
                        dangerouslySetInnerHTML={{ __html: trimHtml(card?.response, 10) }} 
                    /> 
                     {card?.response?.split(' ').length > 50 && (
                      <button
                        className="text-blue-500 mt-2 focus:outline-none"
                      >
                       Review 
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
  
        </div>
      </div>
    </div>
  );
}

export default AppResponse;
