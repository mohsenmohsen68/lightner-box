import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";
import { deleteCard, getCardsFromServer, updateCard } from "@/redux/card/card";
import { useDispatch } from "react-redux";
import { TfiShiftLeftAlt } from "react-icons/tfi";
import { BiLike, BiShow, BiDislike } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

export default function manualReview({ boxData, handleReturn }) {
  const [carts, setCarts] = useState([]);
  const [boxNumber, setBoxNumber] = useState(0);
  const [viewAnswer, setViewAnswer] = useState(false);
  const dispatch = useDispatch();


  const deleteThisCard = (cardID,score) => {
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
        allowedToDeleteThisCard(cardID,score);
      }
      if (result.isDismissed) {
        //do nothing
      }
    });
  };

  const allowedToDeleteThisCard = async (cardID,score) => {
    const res = await dispatch(deleteCard(cardID));
    if (res.payload.status === 200) {
      selectCards(score);
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba"
        },
        position: "bottom-end",
        title: " فلش کارت با موفقیت حذف شد ...",
        icon: "success"
      });
    } else {
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
  };


  const selectCards = async (boxNumber) => {
    setBoxNumber(boxNumber);
    const body = {
      boxNumber,
      userID: boxData.userID,
      courseID: boxData.courseID
    };
    const res = await dispatch(getCardsFromServer(body));
    setCarts(res.payload.data);
    return res.payload.data
  };

  const goToNextBox = async ({ question, answer, score }) => {
    console.log("Question : ", question, "answer : ", answer, "score :",score);
    const body = { question, answer, score, userID: boxData.userID, courseID: boxData.courseID, correct: true };
    console.log("body.... : ", body);
    const res = await dispatch(updateCard(body));
    console.log("ress ; ", res);
    if (res.payload.status === 200) {
      selectCards(score);
    }
  };

  const goToFirstBox = async ({ question, answer,score }) => {
    const body = { question, answer, score, userID: boxData.userID, courseID: boxData.courseID, correct: false };
    const res = await dispatch(updateCard(body));
    if (res.payload.status === 200) {
      selectCards(score);
    }
  };

  const shiftToNextBox = async ({ question, answer, score },boxNumber) => {
    const body = { question, answer, score, userID: boxData.userID, courseID: boxData.courseID, correct: true };
    const res = await dispatch(updateCard(body));
    if (res.payload.status === 200) {
      selectCards(boxNumber);
    }
  };

  const shiftCardForward = async (boxNumber) => {
    let boxNumbers = [];
    if (boxNumber === 66) {
      boxNumbers = [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65];
    } else if (boxNumber === 48) {
      boxNumbers = [41, 42, 43, 44, 45, 46, 47];
    } else if (boxNumber === 34) {
      boxNumbers = [31, 32, 33];
    } else if (boxNumber === 22) {
      boxNumbers = [21];
    } else if (boxNumber === 1) {
      boxNumbers = [];
    }
    
    boxNumbers.map(async (item) => {
      const cards = await selectCards(item);
      cards.map((newItem) => {
        shiftToNextBox(newItem, boxNumber);
      });
    });
  };

  return (
    <div className='flex justify-center items-center gap-4 h-[calc(100vh_-_80px)] w-full font-moraba-medium'>
      <div className='w-2/6  h-full flex flex-col'>
        <div className='w-full h-1/6 bg-blue-200 text-white flex flex-col justify-center items-center '>
          <div className='flex justify-center items-center h-1/3'>
            خانه‌ی اول
          </div>
          <div className='flex w-full h-2/3'>
            <div
              className=' w-full border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(1)}
            >
              {(1).toLocaleString("fa-ir")}
            </div>
          </div>
        </div>
        <div className='w-full h-1/6 bg-blue-300 text-white flex flex-col justify-center items-center '>
          <div className='flex justify-center items-center h-1/3'>
            خانه‌ی دوم
          </div>
          <div className='flex w-full h-2/3'>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(21)}
            >
              {(1).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(22)}
            >
              {(2).toLocaleString("fa-ir")}
            </div>
          </div>
        </div>
        <div className='w-full h-1/6 bg-blue-400 text-white flex flex-col justify-center items-center '>
          <div className='flex justify-center items-center h-1/3'>
            خانه‌ی سوم
          </div>
          <div className='flex w-full h-2/3'>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(31)}
            >
              {(1).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(32)}
            >
              {(2).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(33)}
            >
              {(3).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(34)}
            >
              {(4).toLocaleString("fa-ir")}
            </div>
          </div>
        </div>
        <div
          className='w-full h-1/6 bg-blue-500 text-white flex flex-col justify-center items-center '
          d
        >
          <div className='flex justify-center items-center h-1/3'>
            خانه‌ی چهارم
          </div>
          <div className='flex w-full h-2/3'>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(41)}
            >
              {(1).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(42)}
            >
              {(2).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(43)}
            >
              {(3).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(44)}
            >
              {(4).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(45)}
            >
              {(5).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(46)}
            >
              {(6).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(47)}
            >
              {(7).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black'
              onClick={() => selectCards(48)}
            >
              {(8).toLocaleString("fa-ir")}
            </div>
          </div>
        </div>
        <div className='w-full h-1/6 bg-blue-600 text-white flex flex-col justify-center items-center '>
          <div className='flex justify-center items-center h-1/3'>
            خانه‌ی پنجم
          </div>
          <div className='flex w-full h-2/3'>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(51)}
            >
              {(1).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(52)}
            >
              {(2).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(35)}
            >
              {(3).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(54)}
            >
              {(4).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(55)}
            >
              {(5).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(56)}
            >
              {(6).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(57)}
            >
              {(7).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(58)}
            >
              {(8).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(59)}
            >
              {(9).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(60)}
            >
              {(10).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(61)}
            >
              {(11).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(62)}
            >
              {(12).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(63)}
            >
              {(13).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(64)}
            >
              {(14).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(65)}
            >
              {(15).toLocaleString("fa-ir")}
            </div>
            <div
              className=' w-1/2 border h-full flex justify-center items-center hover:text-black hover:cursor-pointer'
              onClick={() => selectCards(66)}
            >
              {(16).toLocaleString("fa-ir")}
            </div>
          </div>
        </div>
        <div
          className='w-full h-1/6 bg-blue-700 text-white flex justify-center items-center '
          onClick={() => selectCards(6)}
        >
          آرشیو
        </div>
      </div>
         <div className='w-4/6  h-full flex flex-col justify-center items-center'>
          {/* box identfication and number of carts inside that box */}
          <div className='w-full h-1/6  flex justify-evenly items-center'>
            <div>نام باکس : {boxData.courseTitle}</div>
            <div>
              خانه‌ی شماره :{" "}
              {boxNumber === 0
                ? "انتخاب نشده"
                : boxNumber.toLocaleString("fa-ir")}
            </div>
            <div>تعداد کارت ها: {carts.length.toLocaleString("fa-ir")}</div>
          </div>

          {/* manual swiper */}

          <div className='w-full h-5/6  flex flex-col justify-center items-center'>
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
              className='w-11/12 h-4/6 sm:w-4/5 sm:h-4/5 md:w-2/5 md:h-4/5 '
            >
              {carts.length < 1 ? (
                <SwiperSlide className='flex justify-center font-moraba-medium items-center text-white bg-orange-500'>
                  <div className='flex justify-evenly items-center w-full h-full p-2 '>
                    فلش کارتی موجود نیست ...
                  </div>
                </SwiperSlide>
              ) : (
                carts.map((item) => (
                  <SwiperSlide className='flex justify-center items-center text-white '>
                    <div className='flex justify-evenly items-center w-full h-1/6 p-2 bg-slate-200 mb-1'>
                      {item.score === 1 ||
                      item.score === 22 ||
                      item.score === 34 ||
                      item.score === 48 ||
                      item.score === 66 ? (
                        <>
                          <div className=' rounded-full p-2 text-green-500 border-green-500 text-xl border-2'>
                            <BiLike
                              onClick={() => {
                                goToNextBox(item);
                              }}
                            />
                          </div>
                          <div className=' rounded-full p-2 text-red-500 border-red-500 text-xl border-2'>
                            <BiDislike onClick={() => goToFirstBox(item)} />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div className=' rounded-full p-2 text-sky-500 border-sky-500 text-xl border-2'>
                        <BiShow
                          onClick={() => setViewAnswer(!viewAnswer)}
                          className='hover:cursor'
                        />
                      </div>
                      <div className=' rounded-full p-2 text-orange-500 border-orange-500 text-xl border-2'>
                        <FaRegTrashAlt
                          onClick={() => deleteThisCard(item._id, item.score)}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col w-full h-5/6 gap-2'>
                      <div className='flex flex-col items-center justify-center w-full h-1/2 shadow-lg bg-sky-500 font-moraba-medium '>
                        {item.question}
                      </div>
                      <div className='flex flex-col items-center justify-center w-full h-1/2 shadow-lg bg-red-500 font-moraba-medium '>
                        {viewAnswer ? item.answer : ""}
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
          <div className='flex justify-center items-center gap-2  mb-2'>
            {boxNumber === 22 ||
            boxNumber === 34 ||
            boxNumber === 48 ||
            boxNumber === 66 ? (
              <div className='flex gap-1 justify-center items-center'>
                <div>
                  بعد از مرور تمام لغات، زیر جعبه های این جعبه را شیفت دهید ...
                </div>
                <TfiShiftLeftAlt
                  className='mt-2 text-3xl text-white p-1 rounded-full bg-green-400 mb-2'
                  onClick={() => {
                    shiftCardForward(boxNumber);
                  }}
                />
              </div>
            ) : (
              ""
            )}
          <button
          className='bg-green-400 p-2 rounded-full text-white w-fit justify-self-center'
          onClick={()=>handleReturn()}
        >
          بازگشت
        </button>
          </div>
        </div>
       
    </div>
  );
}
