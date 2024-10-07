'use client'
import React from 'react'
import Media from '@/components/media'
import { useState } from 'react'
import ImageList from '@/components/imageList'
const Page = () => {

  const [refreshTrigger, setRefreshTrigger ] = useState(0);

  const handleUploadSuccess  = () => {
    setRefreshTrigger(refreshTrigger + 1);
  }
  return (
    <div>
        <Media  onUploadSuccess={handleUploadSuccess}  />
        <ImageList refreshTrigger={refreshTrigger}/>
    </div>
  )
}

export default Page