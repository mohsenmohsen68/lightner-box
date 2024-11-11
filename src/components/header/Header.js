import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./header.module.css";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { PiSunThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, me, userLogesIn, userLogesOut } from "@/redux/users/Users";

const Header = () => {
  const router = useRouter();
  const userStatus = useSelector(state=>state)
  console.log("userStatus : ",userStatus,userStatus.user.isUserLogged)
  const dispatch = useDispatch()
  const pathname = usePathname();

  
  useEffect(()=>{
  const userSatusChecker = async () => {
    const result = await dispatch(me());
    if (result.payload.status === 200) {
       dispatch(userLogesIn())
      }else{
       dispatch(userLogesOut())    
    }
  }
  userSatusChecker()
},[])

  return (
    <div className='w-full h-20 flex items-center justify-center font-moraba-medium shadow-emerald-400 shadow-sm '>
      <div className='w-1/4 flex justify-center items-center'>
        <Image src={"/img/images.jpeg"} width={60} height={60} />
      </div>

      <nav className='w-1/2 flex list-none '>
        <Link
          href={"/"}
          className={` h-20 flex justify-center items-center px-5 ${
            pathname === "/" ? styles.active : ""
          }`}
        >
          صفحه اصلی
        </Link>
        <Link
          href={"/help"}
          className={` h-20 flex justify-center items-center px-5 ${
            pathname === "/help" ? styles.active : ""
          }`}
        >
         جعبه لایتنر
        </Link>
        <Link
          href={"/aboutus"}
          className={` h-20 flex justify-center items-center px-5 ${
            pathname === "/aboutus" ? styles.active : ""
          }`}
        >
برنامه ریزی درسی
        </Link>
        <Link
          href={"/login"}
          className={` h-20 flex justify-center items-center px-5 ${
            pathname === "/login" ? styles.active : ""
          }`}
        >
          ورود
        </Link>

        <Link
          href={"/signup"}
          className={` h-20 flex justify-center items-center px-5 ${
            pathname === "/signup" ? styles.active : ""
          }`}
        >
          ثبت نام
        </Link>
      </nav>

      <div className='flex justify-center items-center w-1/4'>
        <div className='w-10 h-10 rounded-full border mr-3 flex justify-center items-center text-2xl'>
          {userStatus.user.isUserLogged ? <CiLogout onClick={async()=>{
            const result =await dispatch(logOutUser())
            console.log("log out result ", result)
            dispatch(userLogesOut())
           router.replace('/')
          }}/> : <CiLogin onClick={()=>{
            router.push('/login')
            }} />}
        </div>
        <div className='w-10 h-10 rounded-full border mr-3 flex justify-center items-center text-2xl'>
          <PiSunThin />
          {/* <PiMoonThin/> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
