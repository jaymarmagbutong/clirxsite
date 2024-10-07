"use client"
import React, { useEffect, useState } from 'react';

const SingleContent = ({ pages }) => {

    return (

        <>
            <div className="w-full mt-5 p-4 bg-white rounded-md flex flex-col">
                <h1 className='font-bold text-3xl flex items-center justify-between w-full'><span>{pages.title}</span> <span>{(pages.reference_number !== '' && pages.reference_number !== undefined ) ? `(${pages?.reference_number})` : '' }</span></h1>
                <div className='border p-4 mt-6 shadow-md'
                    dangerouslySetInnerHTML={{ __html: pages.description }} 
                />
            </div>
        </>
       
    );
}

export default SingleContent; 
