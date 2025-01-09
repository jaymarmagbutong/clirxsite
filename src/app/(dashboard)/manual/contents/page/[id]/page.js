"use client"
import React, { useEffect, useState } from 'react';
import UsersList from '@/components/user/userList';
import SingleContent from '@/components/page/singleContent';
import Breadcrumbs from "@/components/breadcrumbs"
import BackButton from "@/components/backButton"
import ApptResponse from "@/components/appt/apptResponse"
import ApptAdminAction from '@/components/modals/apptAdminAction';
import ActivityPage from '@/components/appt/apptActivity';
import ApptHistory from '@/components/appt/apptHistory';
import Skeleton from 'react-loading-skeleton';
import Comment from '@/components/appt/comments';

import io from 'socket.io-client';

const socket = io('http://localhost:8080/');

export default function Page({ params }) {

    const [pages, setPages] = useState('');
	const [apptResponse, setApptResponse] = useState('');
	const [modalStatus, setModalStatus] = useState(false);
	const [modalContent, setModalContent] = useState();
	const [pageHistory, setPageHistory] = useState();
	const [socketAction, setSocketAction] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(()=> {
		socket.on('connect', () => {
			console.log('Connected to Socket.IO server');
		});
		// Listen for the test message from the server
	
		socket.on('message', (message) => {
			console.log('Message from server:', message);
			socketTrigger()
			
		});

		return () => {
			socket.disconnect();
		};

	}, [])

	const showModal = () => {
		setModalStatus(prevModalStatus => !prevModalStatus);
	}

	const socketTrigger = () => {
		setSocketAction(prevModalStatus => !prevModalStatus);
	}

	const { id } = React.use(params); // Unwrap params to get id
	 // Fetch both page details and page history
	 useEffect(() => {
		const fetchData = async () => {

	
		  try {
			// Fetch Page Details
			const pageResponse = await fetch(`/api/pages/get/${id}`, {
			  next: { revalidate: 3600 },
			});
			const pageData = await pageResponse.json();
			setPages(pageData.pages || "");
			setApptResponse(pageData.appt_response || "");
	
			// Fetch Page History
			const historyResponse = await fetch(`/api/appt/history/get/${id}`, {
			  next: { revalidate: 3600 },
			});
			const historyData = await historyResponse.json();
			setPageHistory(historyData || []);
		  } catch (error) {
			console.error("Failed to fetch data:", error);
		  } finally {
			setLoading(true);
		  }
		};
	
		fetchData();
	  }, [id, modalStatus, socketAction]); // Dependencies to refetch when these values change
	
	if(!loading){
		return (
			 <>
				<h1 className='font-bold text-4xl p-4 bg-white'><Skeleton/></h1>
			
				  <div className='grid mt-4 grid-cols-1 md:grid-cols-4 gap-4'>
					
					<div className='col-span-1 md:col-span-3 bg-white  rounded-md p-4'>
					  <Skeleton count={10}/>
					</div>
					<div className='  bg-white  rounded-md p-4'>
					<Skeleton count={10}/>
					</div>
				  </div>
				</>
		);
	}

	return (
		<>
			<ApptAdminAction modalFunction={showModal} modalStatus={modalStatus} content={modalContent} pageId={id} oldPageContent={pages.description}/>
			<div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-sm'>
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
					<SingleContent pages={pages} modalAction={showModal} />
					<ApptResponse appt_response={apptResponse}/>
					<div className="mt-4">
					<Comment commentData='' pageId={id} />
					</div>
					
				</div>

				<div className='mt-5'>
					<div className='bg-white  rounded-md p-4'>
					<h4 className='font-bold mb-3 '>Contributor</h4>
                    <hr className='mb-4'></hr>
						<UsersList option={'singlepage'} page_id={id}/>
					</div>
					<ActivityPage appt_response={apptResponse} modalAction={showModal} setModalContent={setModalContent}/>
					<ApptHistory historyLists={pageHistory}/>
				</div>
			</div>
			
		</>
	)
}