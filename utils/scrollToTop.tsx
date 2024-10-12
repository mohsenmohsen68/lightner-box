'use client'
import { Hidden } from '@mui/material';
import React,{useEffect, useState} from 'react'
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTop() {
    const [showScrollIcon,setShowScrollIcon] = useState<boolean>(false)

    useEffect(()=>{
        const onScrollFunction=()=>{

            if(window.scrollY > 120){
               setShowScrollIcon(true) 
            }else{
                setShowScrollIcon(false)
            }
        }

        window.addEventListener('scroll',onScrollFunction)
    },[])

const scrollToTop=()=>{
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
}

  return (
   
    <div className={`${showScrollIcon? 'visible': 'hidden' } flex justify-center items-center p-2 w-10 h-10 hover:cursor-pointer z-50 shadow-lg rounded-full`}>
      <IoIosArrowUp onClick={scrollToTop}/>
    </div>
  )
}
