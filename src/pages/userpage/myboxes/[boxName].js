import Header from "@/components/header/Header";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import styles from "./style.module.css";
import { BiLike, BiShow, BiDislike } from "react-icons/bi";
import { EffectCreative } from "swiper/modules";
import { CiSquarePlus } from "react-icons/ci";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useDispatch } from "react-redux";
import { me } from "@/redux/users/Users";
import { createANewCard } from "@/redux/card/card";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4
};

function MyBox() {
  const route = useRouter();
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const clickHandler = async()=>{
    const user = await dispatch(me())
    const userID = user.payload.data._id;
    const courseID = route.query.boxName;
     console.log('user : ', userID)
     console.log('course : ', courseID)
     const cardBody = {question, answer, userID, courseID}
     const response =await dispatch(createANewCard(cardBody))
     console.log("card response : ", response)
  }

  return (
    <div>
      <Header />
      <div className='h-[calc(100vh_-_80px)] w-full bg-yellow-300 flex justify-center items-center'>
        <div className='w-1/6  h-full flex flex-col'>
          <div className='w-full h-1/6 bg-blue-200 text-white flex justify-center items-center hover:text-slate-500'>
            خانه‌ی اول
          </div>
          <div className='w-full h-1/6 bg-blue-300 text-white flex justify-center items-center hover:text-slate-500'>
            خانه‌ی دوم
          </div>
          <div className='w-full h-1/6 bg-blue-400 text-white flex justify-center items-center hover:text-slate-500'>
            خانه‌ی سوم
          </div>
          <div className='w-full h-1/6 bg-blue-500 text-white flex justify-center items-center hover:text-slate-500'>
            خانه‌ی چهارم
          </div>
          <div className='w-full h-1/6 bg-blue-600 text-white flex justify-center items-center hover:text-slate-500'>
            خانه‌ی پنجم
          </div>
          <div className='w-full h-1/6 bg-blue-700 text-white flex justify-center items-center hover:text-slate-500'>
            آرشیو
          </div>
        </div>
        <div className='w-5/6 bg-green-300 h-full flex flex-col'>
          <div className='w-full h-1/6 bg-yellow-400 flex justify-evenly items-center'>
            <div>نام باکس : {"فرانسه"}</div>
            <div>خانه‌ی شماره {"یک"}</div>
            <div>تعداد کارت ها: {120}</div>
          </div>

          <div className='w-full flex justify-center items-center bg-white' >
            <p>اضافه کردن کارت جدید </p>
            <button
              className='p-1 rounded-full bg-green-400 text-white mr-4'
              onClick={() => {
                setOpen(true);
              }}
            >
              <CiSquarePlus className='text-4xl' />
            </button>
          </div>

          <div className='w-full h-5/6 bg-yellow-200 flex justify-center items-center'>
            <Swiper
              grabCursor={false}
              effect={"creative"}
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, 0, -400]
                },
                next: {
                  translate: ["100%", 0, 0]
                }
              }}
              modules={[EffectCreative]}
              className='w-11/12 h-5/6 sm:w-4/5 sm:h-4/5 md:w-2/5 md:h-4/5 '
            >
              <SwiperSlide className='flex justify-center items-center text-white bg-green-800'>
                <div className='flex justify-evenly items-center w-full h-1/6 p-2 '>
                  <div className='border rounded-full p-2 text-green-500 border-green-500 text-xl border-2'>
                    <BiLike />
                  </div>
                  <div className='border rounded-full p-2 text-red-500 border-red-500 text-xl border-2'>
                    <BiDislike />
                  </div>
                  <div className='border rounded-full p-2 text-sky-500 border-sky-500 text-xl border-2'>
                    <BiShow />
                  </div>
                </div>
                <div className='flex justify-evenly w-full h-5/6 items-center bg-red-500'>
                  dd
                </div>
              </SwiperSlide>
              <SwiperSlide className='bg-red-400'>Slide 2</SwiperSlide>
              <SwiperSlide className='bg-green-400'>Slide 3</SwiperSlide>
              <SwiperSlide className=''>Slide 4</SwiperSlide>
              <SwiperSlide className=''>Slide 5</SwiperSlide>
              <SwiperSlide className=''>Slide 6</SwiperSlide>
              <SwiperSlide className=''>Slide 7</SwiperSlide>
              <SwiperSlide className=''>Slide 8</SwiperSlide>
              <SwiperSlide className=''>Slide 9</SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <textarea
              rows={4}
              className='font-dana-medium mr-2 mt-2 block mb-2 p-2 border w-full outline-none '
              placeholder='سوال خودت رو وارد کن ...'
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
            <textarea
              rows={4}
              className='font-dana-medium mr-2 mt-2 p-2 block mb-2 border w-full outline-none  '
              placeholder='پاسخ خودت رو وارد کن ...'
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
            />
            <div className='w-full flex items-center justify-end'>
              <button
                className='font-dana p-2 bg-green-500 hover:bg-green-600 text-white rounded-full justify-end'
                onClick={() => clickHandler()}
              >
                ثبت کارت جدید
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default MyBox;
