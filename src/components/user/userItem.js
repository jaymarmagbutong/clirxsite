import React from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';

const roles = {
  1: 'Admin', 
  2: 'Editor', 
  3: 'Viewer'
};

function UserItem({ user }) {
  return (
    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-600" key={user.id}>
      <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.username}</td>
      <td className="py-2 px-4 text-gray-500 dark:text-gray-400">{user.email}</td>
      <td className="py-2 px-4 text-gray-500 dark:text-gray-400">
        {roles[user.role] || 'Unknown Role'}
      </td>
      <td className="py-2 px-4 flex items-center space-x-2 justify-center">
        <Link 
          href={`/user/edit/${user.id}`} 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <FaEdit className="inline-block" />
        </Link>
        <button 
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          aria-label="Delete user"
        >
          <FaTrash className="inline-block" size={15} />
        </button>
      </td>
    </tr>
  );
}

export default UserItem;
