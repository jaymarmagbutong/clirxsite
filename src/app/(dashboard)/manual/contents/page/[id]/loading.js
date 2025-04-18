import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () => {
  return (
    <>
    <h1 className='font-bold text-4xl p-4 bg-white'><Skeleton/></h1>

      <div className='grid mt-4 grid-cols-1 md:grid-cols-4 gap-4'>
        
        <div className='col-span-1 md:col-span-3 bg-white  rounded-md p-4'>
          <Skeleton count={10}/>
        </div>

      </div>
    </>
  )
}

export default Loading