import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const ApptAdminAction = ({ modalFunction , modalStatus, content}) => {
    

    const [apptContent, setaApptContent] = useState([]);

    useEffect(() => {
      if (content) {
        setaApptContent(content);
      }
    }, [content]);
  
  

    return (
        <div>
            <Modal

                isOpen={modalStatus}
                onRequestClose={modalFunction}
                contentLabel="Example Modal"
                className="bg-white shadow-lg max-w-[90%] md:max-w-[900px] w-full max-h-full overflow-y-auto p-2 rounded-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                closeTimeoutMS={500}
            >
                <div className='bg-gray-100'>


                    <div className='w-full'>
                        <div className='p-4'>
                            <h1 className='font-bold text-2xl'>{apptContent.title}</h1>
                            <p className="mb-1 mt-4 text-md font-normal leading-none text-gray-400 dark:text-gray-500">Submitted by: {apptContent.username}</p>

                            <div className=' bg-white p-4 mt-6'
                                dangerouslySetInnerHTML={{ __html: apptContent.response }} 
                            />
                        </div>
                    </div>
                    <div className='w-full border-t-2 p-4 bg-gray-400 flex justify-between'>
                        <div className="flex gap-2">
                            <button className=" bg-clirxColor px-4 py-2 rounded text-white">Approved</button>
                            <button className="bg-white bg-transparent border px-4 py-2 rounded ">Later</button>
                        </div>
                        <button onClick={modalFunction} className="bg-white bg-transparent border px-4 py-2 rounded ">Close Modal</button>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default ApptAdminAction