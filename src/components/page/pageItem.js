import React from 'react'
import Link from 'next/link'
import { formatDate } from '../../../libs/dateUtils'
import { MdEditNote, MdDelete } from "react-icons/md";


export const PageItem = ({page}) => {
  return (
    <div>
        <div
            className="flex items-center text-sm py-3 px-4 border-b hover:bg-gray-50"
        >
            <div className="w-3/4 font-semibold"> <Link href={`/page/edit/${page.id}`} className="cursor-pointer text-blue-900">{page.title}</Link></div>
            <div className="w-2/4 text-gray-500">{page.username}</div>
            <div className="w-2/4 text-gray-500 whitespace-pre-wrap">{ formatDate(page.date_created)}</div>
            <div className="w-1/4 text-base">
                <div className="text-base gap-2 flex px-3 items-center">
                    <Link href={`/page/edit/${page.id}`} className="cursor-pointer">
                    <MdEditNote size={25} />
                    </Link>
                    <span className="cursor-pointer">
                    <MdDelete size={20} />
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
