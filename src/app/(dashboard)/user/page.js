import React from 'react'
import UsersList from '@/components/user/userList'

const page = () => {
  return (
    <div className='mt-5'>
      <UsersList option={'userlist'}/>
    </div>
  )
}

export default page