import Header from "@/components/header/Header";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { MdNotificationsOff } from "react-icons/md";


export default function index() {
  return (
    <div>
      <Header />
      <div className="w-full p-4 ">
        {/* add baily tasks ... */}
        <div className='w-full h-10 flex justify-center gap-2 mt-2 '>
          <div className='w-1/2 h-full border rounded-full border-green-500 flex items-center justify-between py-2 px-3'>
            <input
              type='text'
              placeholder='اضافه کردن تسک جدید ...'
              className='w-11/12 h-full outline-none'
            />
            <button className=' rounded-full p-2 text-xl bg-green-500 hover:cursor-pointer hover:text-white hover:bg-green-400'>
              <FiPlus />
            </button>
          </div>
        </div>

        {/* view the tasks status */}
        <div className="w-full mt-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">

        <div className=' shadow-lg hover:-translate-y-1 '>
          <div className='flex flex-col gap-3 font-moraba justify-center items-center p-2'>
            <div >خریدن فلش </div>
            <div className="flex justify-center items-center text-2xl">
              <RiDeleteBin3Line />
              <MdOutlineFileDownloadDone />
              <MdNotificationsActive />
              <MdNotificationsOff/>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
