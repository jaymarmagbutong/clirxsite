"use client"
import React, { useEffect, useState } from 'react';
import UsersList from '@/components/user/userList';
import SingleContent from '@/components/page/singleContent';
import Breadcrumbs from "@/components/breadcrumbs"
import BackButton from "@/components/backButton"
import AppResponse from "@/components/appt/appResponse"
import ApptAdminAction from '@/components/modals/apptAdminAction';

import ActivityPage from '@/components/appt/apptActivity';

export default function Page({ params }) {

    const [pages, setPages] = useState('');
	const [apptResponse, setApptResponse] = useState('');
	const [modalStatus, setModalStatus] = useState(false);
	const [modalContent, setModalContent] = useState()

	const id = params.id;
	
    useEffect(() => {
        const getPageDetails = async () => {
            try {
                const page = await fetch(`/api/pages/get/${id}`, { next: { revalidate: 3600 } });
                const data = await page.json();
				setPages(data.pages || '')
               	setApptResponse(data.appt_response || '' )
            } catch (error) {
                console.error('Failed to fetch page details:', error);
            }
        }
        getPageDetails();
    }, [id]);

	const showModal = () => {
		setModalStatus(prevModalStatus => !prevModalStatus);
	}

	return (
		<>
			<div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-md'>
				<div>
					<h1 className='font-bold text-2xl'>Page Details</h1>
					<Breadcrumbs />
				</div>
				<div>
					<BackButton />
				</div>
			</div>

			
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				<div className='col-span-1 md:col-span-3'>
					<SingleContent pages={pages}/>
					<AppResponse appt_response={apptResponse}/>
				</div>

				<div className='mt-5'>
					<div className='bg-white  rounded-md p-4'>
						<UsersList option={'singlepage'} page_id={id}/>
					</div>
					<ActivityPage appt_response={apptResponse} modalAction={showModal} setModalContent={setModalContent}/>
				</div>
			</div>
			<ApptAdminAction modalFunction={showModal} modalStatus={modalStatus} content={modalContent}/>
		</>
	)


}