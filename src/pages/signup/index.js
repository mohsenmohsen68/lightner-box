import React, { useEffect } from "react";
import SignUpModule from "@/components/SignUp/SignUpModule";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const Index = () => {

  const mystate = useSelector(state=>state)
  const router = useRouter()
  useEffect(()=>{
    const islogged = mystate.user.isUserLogged
    console.log("state",mystate.user.isUserLogged)
  if(islogged){
    router.push('/userpage')
  }
  },[])

  return (
    <div className='w-full h-dvh flex justify-center items-center flex-col font-moraba'>
      <div className='flex flex-col justify-center items-center'>
        <Image src={"/img/images.webp"} width={90} height={90} alt='لوگوی سایت' />
        <div className='font-moraba-demiBold mb-2 '>
          جعبه لغات دیجیجادو
        </div>
      </div>

      <SignUpModule/>

      <div className='flex flex-col justify-center items-center font-moraba-medium mt-2'>
        با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمات
        <div className='text-green-600 '> وبسایت دیجیجادو </div>
        <div className='text-red-600 '>را پذیرفته اید. </div>
      </div>
    </div>
  );
}

export default Index