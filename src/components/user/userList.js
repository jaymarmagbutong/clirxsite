"use client"
import React, { useEffect, useState } from 'react';
import UserItem from './userItem';
import PageUserItem from './pageUserItem';


export default function UsersList({option, page_id}) {
	const [userLists, setUserLists] = useState();

	const [appt, setAppt] = useState();


	useEffect( ()  => {
        const getAppt =  async () => {

            try {
                const accreditation = await fetch(`/api/appt/get/${page_id}`);
                const data = await accreditation.json();
                setAppt(data)
            } catch (error) {
                console.error('Failed to fetch page details:', error);
            }
        }

        getAppt();
    }, [page_id])



	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch('/api/users/get');
				if(!response.ok){
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setUserLists(data);
	
			} catch (error) {
				console.log("Error users", error)
			}
		}

		fetchUsers();
	}, [])


	const optionModel = ['singlepage', 'userlist'];


	if (!optionModel.includes(option)) {
		return (
			<>
			<p>Cant reach the users list</p>
			</>
		)
	} 

	if(option=='singlepage'){
		
		return (
			<>
			{userLists?.map(user => (
				<div key={user.id}>
				<PageUserItem key={user.id}  user={user} page_id={page_id} users_id={appt}/>
				</div>
			))}
			</>
		)
	} else if(option=='userlist')

		return (
			<div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-sm">
				<h2 className="font-bold mb-6 text-gray-900 dark:text-gray-100">Users List</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
						<thead className="bg-gray-50 dark:bg-gray-800">
							<tr>
								<th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
								<th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
								<th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
								<th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
							{userLists?.map(user => (
								<UserItem key={user.id} user={user} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	

}
