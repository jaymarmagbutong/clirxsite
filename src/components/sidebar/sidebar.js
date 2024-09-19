"use client"
import React from 'react'
import AdminSidebar from './admin';
import EditorSidebar from './editor';
import VeiewerSidebar from './viewer';
import { useSession } from "next-auth/react";

const Sidebar = ()  => {
    const { data: session, status } =  useSession();
    const role = parseInt(session?.user?.role);

    let sidebar = null;

    switch (role) {
        case 1:
            sidebar = <AdminSidebar/>
            break;
        case 2:
            sidebar = <EditorSidebar/>
            break;
        case 3:
            sidebar = <VeiewerSidebar/>
            break;
    
        default:
            break;
    }

  return (
    <div>
        
    {sidebar}

    </div>
  )
}

export default Sidebar