import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
const ApptAdminAction = ({ modalFunction, modalStatus, content, pageId, oldPageContent  }) => {

	const [apptContent, setaApptContent] = useState([]);

	useEffect(() => {
		if (content) {
			setaApptContent(content);
		}
	}, [content]);
	useEffect(() => {
        // Setting the app element to 'body' when the component mounts
        Modal.setAppElement('body');
      }, []); 



	const haddleApproved = async () => {
		const from_user_id = content.user_id;
		try {
			const res = await fetch('/api/appt/history/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					content,
					pageId,
					oldPageContent,
					from_user_id
				}),
			});

			if (res.ok) {
				toast.success('History added successfully!');
				modalFunction()
		
			}
			if (res.status == 400) {
				toast.error('Error Creating History');
			}

		} catch (error) {
			toast.error('Error Creating History');
		} finally {

		}
	}

	const copyToClipboard = () => {
		const htmlContent = apptContent.response; // Assuming this contains HTML with a table
	
		if (htmlContent) {
			// Create a Blob for both 'text/html' and 'text/plain' (fallback for non-HTML paste)
			const blobHTML = new Blob([htmlContent], { type: 'text/html' });
			const blobText = new Blob([htmlContent], { type: 'text/plain' });
	
			navigator.clipboard.write([
				new ClipboardItem({
					'text/html': blobHTML,
					'text/plain': blobText  // Adding fallback for plain text paste
				})
			]).then(() => {
				toast.success('Content copied');
			}).catch(() => {
				toast.error('Failed to copy content!');
			});
		}
	};
	


	return (
		<div>
			<Modal

				isOpen={modalStatus}
				onRequestClose={modalFunction}
				contentLabel="Example Modal"
				className="bg-white shadow-lg max-w-[90%] md:max-w-[900px] w-full max-h-full overflow-y-auto p-2 rounded-lg z-999999999"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-99999"
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
							<button className=" bg-clirxColor px-4 py-2 rounded text-white" onClick={haddleApproved}>Approved</button>
							<button className="bg-white bg-transparent border px-4 py-2 rounded" onClick={copyToClipboard}>Copy</button>
						</div>
						<button onClick={modalFunction} className="bg-white bg-transparent border px-4 py-2 rounded ">Close</button>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default ApptAdminAction