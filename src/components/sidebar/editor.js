"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'; 
import MenuItem from '../MenuItem';




const  Admin =  () => {

  const [menuItems, setMenuItems] = useState([]);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
       
        const response = await fetch('/api/menuitems'); // Ensure the path is correct
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleToggle = (index) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };



  if(loading) {
    return   (
      <>
      <Skeleton count={20}/>
      </>
      
    )
  }

  return (
    <div className='drop-shadow-sm '>
      <div className='pb-6'>
        <Image src="/img/logo.png" alt="Logo" width={210} height={210} priority/>
      </div>
      <ul className='flex flex-col border-t border-blue-900 pt-5'>
        {menuItems.map((item, index) => (
          <div key={index}>
            <MenuItem
              href={item.href}
              icon={item.icon}
              label={item.label}
              submenu={item.submenu}
              onToggle={() => handleToggle(index)}
              isExpanded={expandedMenu === index}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
