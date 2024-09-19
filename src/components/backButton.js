"use client"
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();

  return (

<div className='p-3 rounded-full shadow-lg bg-clirxColor cursor-pointer' onClick={() => router.back()} >
  <IoChevronBackOutline size={20}  color='white'/>
</div>



  );
}