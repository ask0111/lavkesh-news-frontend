
"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { CiStar } from "react-icons/ci";

export const MainHeader = () => {
  const route = useRouter()
  return (
    <nav className='w-[100%] p-4 mx-auto flex justify-between items-center bg-slate-100'>
      <ul className='flex gap-4 text-h5 '>
      <li className='hover:text-green-500 cursor-pointer' onClick={()=> route.push("/")} >Home</li>

        {[ "Politics", "Social", "Mumbai", "Capital", "Sports"].map((title)=> <li key={title} className='hover:text-green-500 cursor-pointer' onClick={()=> route.push(`${title.toLowerCase().trim().split(" ").join("")}`)} >{title}</li>
      )}
      </ul>
      <Link href={'/faviorate'} className='text-h4 font-h2 flex gap-3 items-center'><CiStar className='text-h1' /> Favorite</Link>
    </nav>
  )
}
