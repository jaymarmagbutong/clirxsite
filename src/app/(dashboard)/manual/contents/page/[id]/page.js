


import SinglePage from "@/components/page/singlePage"
import Breadcrumbs from "@/components/breadcrumbs"
import BackButton from "@/components/backButton"
export default function Page({params}) {

  return (
    <>
       <div className='flex items-center justify-between bg-white py-2 px-4 rounded-md shadow-md'>
        <div>
          <h1 className='font-bold text-2xl'>Page Details</h1>
          <Breadcrumbs/>
        </div>
        <div>
          <BackButton/>
        </div>
    </div>
    <SinglePage id={params.id}/>
    </>
  ) 
    
  
}