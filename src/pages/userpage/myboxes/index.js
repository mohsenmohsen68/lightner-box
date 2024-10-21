import Header from '@/components/header/Header'
import React from 'react'

function index() {
  return (
    <div>
        <Header/>
        <div className='w-full h-[calc(100vh_-_80px)] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-center items-center gap-3 p-3 font-moraba-medium  '>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'>  زبان انگلیسی</div>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'> علوم </div>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'> زیست </div>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'> ریاضیات </div>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'> قرآن </div>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'> عربی </div>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'> جغرافی </div>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'> فلسفه </div>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'> شیمی </div>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'> اصطلاحات محاوره ای زبان انگلیسی </div>
           <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all'> زبان فرانسه </div>
        </div>
    </div>
  )
}

export default index