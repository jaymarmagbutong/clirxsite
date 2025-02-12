import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { formatDate } from '../../../libs/dateUtils';
const ApptHistoryModal = ({ isOpen, toggleModal, content }) => {


    useEffect(() => {
        // Setting the app element to 'body' when the component mounts
        Modal.setAppElement('body');
    }, []);



    return (
        <div>
        <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal} // Close when clicking outside or pressing ESC

                contentLabel="Appointment History Modal"
                className="bg-white shadow-lg max-w-[90%] md:max-w-[900px] w-full max-h-full overflow-y-auto p-2 rounded-lg z-999999999"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-99999"
            >
                <div className='bg-gray-100'>
					<div className='w-full'>
						<div className='p-4'>
							<h1 className='font-bold text-2xl'>{content?.title}</h1>
						
							<div className=' bg-white p-4 mt-6'
								dangerouslySetInnerHTML={{ __html: content?.old_content }}
							/>


                             <time className="py-4  text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                {formatDate(content?.date_created)}
                            </time>
						</div>
					</div>
				
				</div>
            </Modal>
        </div>
    )
}

export default ApptHistoryModal