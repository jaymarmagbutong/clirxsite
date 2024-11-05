import React, { useEffect, useState } from 'react'
import { formatDate } from '../../../libs/dateUtils';

const ApptHistory = ({ historyLists }) => {

    console.log('historyLists')
    console.log(historyLists)
    console.log('historyLists')
    const [histories, setHistory] = useState([]);

    useEffect(() => {
        setHistory(Array.isArray(historyLists) ? historyLists : []);
    }, [historyLists])
    
    if(historyLists==''){
        return (
          <></>
        )
      }
    
    return (
        <div className="rounded-md mt-3 bg-white p-4  dark:bg-gray-800">
            <h1 className="font-bold text-2xl mb-4">Page History</h1>
            <div className='max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
            <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-2">
                {/* Timeline Item 1 */}

                {
                    histories.map((history, index) => (

                        <li className="mb-5 ml-4" key={index}>
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{formatDate(history.historyDate)}</time>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                <span className="text-clirxColor">Admin </span> has approved {history.user_from} 
                            </h3>
                        </li>
                    ))
                }

            </ol>
            </div>
        </div>
    )
}

export default ApptHistory