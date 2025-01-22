import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../libs/dateUtils';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; // Importing sorting icons

export default function ActivityPage({ appt_response, modalAction, setModalContent }) {
    const [apptResponse, setApptResponse] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'response_created', direction: 'asc' }); // Default sorting config

    useEffect(() => {
        if (appt_response) {
            setApptResponse(appt_response);
        }
    }, [appt_response]);

    const setModalAction = (vals) => {
        modalAction();
        setModalContent(vals);
    };

    const sortActivities = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        // Sorting logic
        const sorted = [...apptResponse].sort((a, b) => {
            if (key === 'response_created') {
                return direction === 'asc'
                    ? new Date(a[key]) - new Date(b[key])
                    : new Date(b[key]) - new Date(a[key]);
            }
            if (key === 'username') {
                return direction === 'asc'
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }
            return 0;
        });
        setApptResponse(sorted);
    };

    if (appt_response === '') {
        return <></>;
    }

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
        }
        return <FaSort />;
    };

    return (
        <div className="rounded-md shadow-sm mt-3 bg-white p-4 dark:bg-gray-800">
            <h1 className="font-bold text-2xl mb-4">Page Status</h1>
            <div className="flex justify-start gap-3 items-center mb-4">
                <button
                    onClick={() => sortActivities('response_created')}
                    className="flex items-center px-3 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
                >
                    Sort by Date {getSortIcon('response_created')}
                </button>
                <button
                    onClick={() => sortActivities('username')}
                    className="flex items-center px-3 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
                >
                    Sort by Username {getSortIcon('username')}
                </button>
            </div>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {apptResponse.map((activity, index) => (
                    <li className="mb-5 ml-4" key={index}>
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {formatDate(activity.response_created)}
                        </time>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            <span className="text-clirxColor">{activity.username}</span> has changed the content
                        </h3>
                        <button
                            onClick={() => setModalAction(activity)}
                            className="inline-flex items-center px-3 mt-3 py-1 text-sm font-thin text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                            Review
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}
