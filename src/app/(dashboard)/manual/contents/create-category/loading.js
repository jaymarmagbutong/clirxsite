import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () => {
  return (
    <>
    <h1 className='font-bold text-4xl'><Skeleton/></h1>
      <Skeleton/>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        
        <div className='col-span-1 md:col-span-3 bg-white  rounded-md p-4'>
        <Skeleton count={10}/>
        </div>

        <div className=''>
          <div className='bg-white  rounded-md p-4'>
          <Skeleton count={10}/>
          </div>
        </div>

      </div>

    </>
  )
}

export default Loading