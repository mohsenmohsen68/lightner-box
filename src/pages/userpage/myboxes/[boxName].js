import Header from "@/components/header/Header";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import styles from "./style.module.css";
import { BiLike, BiShow, BiDislike } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { EffectCreative } from "swiper/modules";
import { CiSquarePlus } from "react-icons/ci";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useDispatch } from "react-redux";
import { me } from "@/redux/users/Users";
import { createANewCard, deleteCard, getCardsFromServer, updateCard } from "@/redux/card/card";
import Swal from "sweetalert2";
import { getCourseTitle } from "@/redux/course/course";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave =Swal.resumeTimer;
  }
});

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
  const [score,setScore] = useState(0)
  const [viewAnswer,setViewAnswer] = useState(false);
  const [retrievedCards, setRetrievedCards] = useState([]);
  const [userID,setUserID] = useState('')
  const [courseID,setCourseID] = useState(route.query.boxName)
  const [courseTitle,setCourseTitle] = useState("")
  const [userFirtName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [cartNum, setCartNum] = useState(0)

  useEffect(()=>{
    const a = async () => {
      const result = await dispatch(me());
      console.log("result", result);
      if (result.payload.status === 200) {
       setUserID( result.payload.data._id)
       setUserFirstName( result.payload.data.firstName)
       setUserLastName( result.payload.data.lastName)
       console.log("route query...",route.query)
       setCourseID(route.query.boxName);
       const course = await dispatch(getCourseTitle(route.query.boxName))
       console.log("course data : ",course.payload.data)
       setCourseTitle(course.payload.data.title)
       } else {
       route.push('./login')
      }
    };
    a();
  },[])

  const addCard = async()=>{
     const cardBody = {question, answer,score:1, userID, courseID}
     const response =await dispatch(createANewCard(cardBody))
     console.log("card response : ", response)
     if(response.payload.status === 422){
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba"
        },
        position: "bottom-end",
        title: "  این فلش کارت قبلا ثبت شده است ...",
        icon: "error"
      });
      setAnswer("")
      setQuestion("")
     }else if(response.payload.status === 200){
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba"
        },
        position: "bottom-end",
        title: " فلش کارت با موفقیت ثبت شد ...",
        icon: "success"
      });
      setAnswer("")
      setQuestion("")
      handleClose()
     }
  }

  const selectCards = async(boxNumber)=>{
    setScore(boxNumber)
    const user = await dispatch(me())
    const userID = user.payload.data._id;
    const courseID = route.query.boxName;
     console.log('user.... : ',  userID)
     console.log('course.... : ', courseID) ;
     const body = {boxNumber, userID,courseID}
    const res = await dispatch(getCardsFromServer(body))
    console.log("res :", res)
    setRetrievedCards(res.payload.data)
    setCartNum(res.payload.data.length)
  }

  const goToNextBox = async({question, answer})=>{
    const user = await dispatch(me())
    const userID = user.payload.data._id;
    const courseID = route.query.boxName;
     console.log('user.... : ',  userID)
     console.log('course.... : ', courseID) ;
     const body = {question, answer, score, userID,courseID,correct:true}
     const res = await dispatch(updateCard(body))
     console.log("ress ; ", res)
     if(res.payload.status === 200){
      selectCards(score)
     }

  }

  const goToFirstBox = async({question, answer})=>{
    const user = await dispatch(me())
    const userID = user.payload.data._id;
    const courseID = route.query.boxName;
     console.log('user.... : ',  userID)
     console.log('course.... : ', courseID) ;
     const body = {question, answer, score, userID,courseID,correct:false}
     const res = await dispatch(updateCard(body))
     console.log("ress ; ", res)
     if(res.payload.status === 200){
      selectCards(score)
     }
  }

  const deleteThisCard = (cardID)=>{
    

    Swal.fire({
      toast: true,
      customClass: {
        title: "font-moraba",
        confirmButton: "font-moraba",
        cancelButton: "font-moraba"
      },
      position: "bottom-end",
      title: "آیا از حذف ااین فلش کارت اطمینان دارید ؟",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "بلی",
      confirmButtonColor: "green",
      showCancelButton: true,
      cancelButtonText: "انصراف",
      cancelButtonColor: "red"
    }).then((result) => {
      if (result.isConfirmed === true) {
       allowedToDeleteThisCard(cardID)
      }
      if(result.isDismissed ){
        //do nothing
      }
    });  
    
    
    
  }
  
  const allowedToDeleteThisCard = async(cardID)=>{
    console.log(cardID)
    const res =await dispatch(deleteCard(cardID))
    console.log("res : ", res)
    if(res.payload.status === 200){
      selectCards(score)
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba"
        },
        position: "bottom-end",
        title: " فلش کارت با موفقیت حذف شد ...",
        icon: "success"
      });
    }else{
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba"
        },
        position: "bottom-end",
        title: " مشکلی به وجود آمده است ...",
        icon: "error"
      });
    }
  }


  return (
    <div>
      <Header />
      <div className='h-[calc(100vh_-_80px)] w-full bg-yellow-300 flex justify-center items-center'>
        <div className='w-1/6  h-full flex flex-col'>
          <div className='w-full h-1/6 bg-blue-200 text-white flex justify-center items-center hover:text-slate-500' onClick={()=>selectCards(1)}>
            خانه‌ی اول
          </div>
          <div className='w-full h-1/6 bg-blue-300 text-white flex justify-center items-center hover:text-slate-500' onClick={()=>selectCards(2)}>
            خانه‌ی دوم
          </div>
          <div className='w-full h-1/6 bg-blue-400 text-white flex justify-center items-center hover:text-slate-500' onClick={()=>selectCards(3)}>
            خانه‌ی سوم
          </div>
          <div className='w-full h-1/6 bg-blue-500 text-white flex justify-center items-center hover:text-slate-500' onClick={()=>selectCards(4)}>
            خانه‌ی چهارم
          </div>
          <div className='w-full h-1/6 bg-blue-600 text-white flex justify-center items-center hover:text-slate-500' onClick={()=>selectCards(5)}>
            خانه‌ی پنجم
          </div>
          <div className='w-full h-1/6 bg-blue-700 text-white flex justify-center items-center hover:text-slate-500' onClick={()=>selectCards(6)}>
            آرشیو
          </div>
        </div>
        <div className='w-5/6 bg-green-300 h-full flex flex-col'>
          <div className='w-full h-1/6 bg-yellow-400 flex justify-evenly items-center'>
            <div>نام باکس : {courseTitle}</div>
            <div>خانه‌ی شماره : {score===0 ? 'انتخاب نشده' : score.toLocaleString('fa-ir')}</div>
            <div>تعداد کارت ها: {cartNum.toLocaleString('fa-ir')}</div>
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
              {console.log(retrievedCards.length)}
              {retrievedCards.length < 1 ? ( <SwiperSlide className='flex justify-center items-center text-white bg-green-800'>
              <div className='flex justify-evenly items-center w-full h-full p-2 '>
                فلش کارتی موجود نیست ...
                </div>
                </SwiperSlide>) :              
                retrievedCards.map(item => (
                  <SwiperSlide className='flex justify-center items-center text-white bg-green-800'>
                    {console.log(item)}
                    
                  <div className='flex justify-evenly items-center w-full h-1/6 p-2 '>
                    <div className='border rounded-full p-2 text-green-500 border-green-500 text-xl border-2'>
                      <BiLike onClick={()=>{goToNextBox(item)}}/>
                    </div>
                    <div className='border rounded-full p-2 text-red-500 border-red-500 text-xl border-2'>
                      <BiDislike onClick={()=>goToFirstBox(item)}/>
                    </div>
                    <div className='border rounded-full p-2 text-sky-500 border-sky-500 text-xl border-2'>
                      <BiShow onClick={()=>setViewAnswer(!viewAnswer)} className="hover:cursor"/>
                    </div>
                    <div className='border rounded-full p-2 text-orange-500 border-orange-500 text-xl border-2'>
                      <FaRegTrashAlt onClick={()=>deleteThisCard(item._id)}/>
                    </div>
                  </div>
                  <div className='flex flex-col w-full h-5/6 bg-red-500'>
                    <div className="flex flex-col items-center justify-center w-full h-1/2">{item.question}</div>
                    <div className="flex flex-col items-center justify-center w-full h-1/2">{viewAnswer ? item.answer : ""}</div>
                  </div>
                </SwiperSlide>
                ))
              }
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
                onClick={() => addCard()}
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


export async function getServerSideProps(context) {
  return {
      props: {},
  };
}
