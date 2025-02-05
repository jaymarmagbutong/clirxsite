'use client';
import React, { useEffect, useState } from 'react';
import { formatDate } from '../../../libs/dateUtils';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; // Importing sorting icons

const ApptHistory = ({ historyLists }) => {
    const [histories, setHistories] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'historyDate', direction: 'asc' }); // Default sorting config

    useEffect(() => {
        const initialHistory = Array.isArray(historyLists) ? historyLists : [];
        // Apply default sorting when the component mounts
        const sorted = initialHistory.sort((a, b) => {
            if (sortConfig.key === 'historyDate') {
                return sortConfig.direction === 'asc'
                    ? new Date(a.historyDate) - new Date(b.historyDate)
                    : new Date(b.historyDate) - new Date(a.historyDate);
            }
            return 0;
        });
        setHistories(sorted);
    }, [historyLists, sortConfig]); // Depend on `historyLists` and `sortConfig`

    const sortHistories = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        // Apply sorting logic immediately
        const sorted = [...histories].sort((a, b) => {
            if (key === 'historyDate') {
                return direction === 'asc'
                    ? new Date(a[key]) - new Date(b[key])
                    : new Date(b[key]) - new Date(a[key]);
            }
            return 0;
        });
        setHistories(sorted);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
        }
        return <FaSort />;
    };

    if (historyLists === '') {
        return <></>;
    }

    return (
        <div className="rounded-md shadow-sm mt-3 bg-white p-4 dark:bg-gray-800">
            <h1 className="font-bold text-2xl mb-4">Page History</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => sortHistories('historyDate')}
                    className="flex items-center px-3 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
                >
                    Sort by Date {getSortIcon('historyDate')}
                </button>

            </div>
            <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-2">
                    {histories.map((history, index) => (

                        <li className="mb-5 ml-4" key={index}>


                            {console.log(history)}
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                {formatDate(history.historyDate)}
                            </time>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                <span className='font-bold'>{history.approve_user} </span> have approved page <span className='font-bold'>{history.title}</span> submitted by <span className='font-bold'>{history.user_from}</span>
                            </h3>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default ApptHistory;
