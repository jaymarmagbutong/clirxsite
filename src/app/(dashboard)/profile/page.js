'use client'
import React from 'react'
import { useSession } from "next-auth/react";


const Profile = () => {
  const { data: session, status } =  useSession();

  return (
    <div>Profile Page</div>
  )
}

export default Profile