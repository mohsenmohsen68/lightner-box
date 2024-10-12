"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/router'
import React from 'react'
import styles from './header.module.css'

function Header() {
  const router = useRouter()
  const pathname = usePathname();
  return (
    <div className='w-full h-20 flex items-center justify-center font-moraba-medium  '>
       <div className='w-1/4 flex justify-center items-center'>
        logo
       </div>

       <nav className='w-1/2 flex list-none '>
        
          <Link href={'/'} className={` h-20 flex justify-center items-center px-5 ${pathname === "/" ? styles.active : ""}`}>
           صفحه اصلی
          </Link>
          <Link href={'/help'} className={` h-20 flex justify-center items-center px-5 ${pathname === "/help" ? styles.active : ""}`}>
            راهنمایی 
          </Link>
          <Link href={'/aboutus'} className={` h-20 flex justify-center items-center px-5 ${pathname === "/aboutus" ? styles.active : ""}`} >
           درباره ما
          </Link>
          <Link href={'/login'} className={` h-20 flex justify-center items-center px-5 ${pathname === "/login" ? styles.active : ""}`} >
           ورود
          </Link>
          
           
           <Link href={'/signin'} className={` h-20 flex justify-center items-center px-5 ${pathname === "/signin" ? styles.active : ""}`}>
            ثبت نام
          </Link>
       </nav>


       <div className='flex justify-center items-center w-1/4'>
        <div className='w-10 h-10 rounded-full bg-red-600 mr-3'></div>
        <div className='w-10 h-10 rounded-full bg-red-600 mr-3'></div>
       </div>
    </div>
  )
}

export default Header
