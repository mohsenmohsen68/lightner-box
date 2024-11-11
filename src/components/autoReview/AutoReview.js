import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";
import { useDispatch } from "react-redux";
import { deleteCard, getCardsFromServer, updateCard } from "@/redux/card/card";
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

export default function AutoReview({ boxData, handleReturn }) {
  const dispatch = useDispatch();
  const [carts, setCarts] = useState([]);
  const [viewAnswer, setViewAnswer] = useState(false);

  useEffect(() => {
    updateAutoCarts();
  }, []);

  const goToNextBox = async ({ question, answer, score }) => {
    const body = {
      question,
      answer,
      score,
      userID: boxData.userID,
      courseID: boxData.courseID,
      correct: true
    };
    const res = await dispatch(updateCard(body));
    if (res.payload.status === 200) {
      updateAutoCarts();
    }
  };

  const selectCards = async (boxNumber) => {
    const body = {
      boxNumber,
      userID: boxData.userID,
      courseID: boxData.courseID
    };
    const res = await dispatch(getCardsFromServer(body));
    setCarts(res.payload.data);
  };

  const selectCardsToShift= async (boxNumber) => {
  const body = {
      boxNumber,
      userID: boxData.userID,
      courseID: boxData.courseID
    };
    const res = await dispatch(getCardsFromServer(body));
    //setCarts(res.payload.data);
    return res.payload.data
  };

  const updateAutoCarts = () => {
    const autoReviewCells = [1, 22, 34, 48, 66];
    const autoReviewCarts = [];
    let flag = false;
    autoReviewCells.map(async (index) => {
      const body = {
        boxNumber: index,
        userID: boxData.userID,
        courseID: boxData.courseID
      };
      const res = await dispatch(getCardsFromServer(body));
      console.log("res type : ", res.payload.data);

      if (res.payload.status === 200 && res.payload.data.length > 0) {
        flag = true;
        autoReviewCarts.push(...res.payload.data);
        setCarts(autoReviewCarts);
      }
    });
    if (!flag) {
      setCarts([]);
    }
  };

  const goToFirstBox = async ({ question, answer, score }) => {
    const body = {
      question,
      answer,
      score,
      userID: boxData.userID,
      courseID: boxData.courseID,
      correct: false
    };
    const res = await dispatch(updateCard(body));
    if (res.payload.status === 200) {
      selectCards(score);
    }
  };

  const deleteThisCard = (cardID) => {
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
        allowedToDeleteThisCard(cardID);
      }
      if (result.isDismissed) {
        //do nothing
      }
    });
  };

  const allowedToDeleteThisCard = async (cardID) => {
    const res = await dispatch(deleteCard(cardID));
    if (res.payload.status === 200) {
      updateAutoCarts();
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

  const shiftCardForward = async () => {
    console.log(".......................")
    const boxNumbers = [
      21, 31, 32, 33, 41, 42, 43, 44, 45, 46, 47, 51, 52, 53, 54, 55, 56, 57,
      58, 59, 60, 61, 62, 63, 64, 65
    ];
    boxNumbers.map(async (item) => {
      const cards = await selectCardsToShift(item);
      // console.log("cardssss : ", cards)
      cards.map((newItem) => {
        // console.log(".",newItem)
        shiftToNextBox(newItem);
      });
    });
  };

  const shiftToNextBox = async ({ question, answer, score }) => {
    const body = {
      question,
      answer,
      score,
      userID: boxData.userID,
      courseID: boxData.courseID,
      correct: true
    };
    const res = await dispatch(updateCard(body));
    console.log("ress ; ", res);
    if (res.payload.status === 200) {
      updateAutoCarts();
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-4 h-[calc(100vh_-_80px)] w-full font-moraba-medium'>
      {console.log("carts : : ", carts.length)}
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
                <div className=' rounded-full p-2 text-green-500 border-green-500 text-xl border-2'>
                  <BiLike
                    onClick={() => {
                      goToNextBox(item);
                    }}
                  />
                </div>
                <div className=' rounded-full p-2 text-red-500 border-red-500 text-xl border-2'>
                  <BiDislike
                    onClick={() => {
                      goToFirstBox(item);
                    }}
                  />
                </div>

                <div className=' rounded-full p-2 text-sky-500 border-sky-500 text-xl border-2'>
                  <BiShow
                    onClick={() => setViewAnswer(!viewAnswer)}
                    className='hover:cursor'
                  />
                </div>
                <div className=' rounded-full p-2 text-orange-500 border-orange-500 text-xl border-2'>
                  <FaRegTrashAlt
                    onClick={() => {
                      deleteThisCard(item._id);
                    }}
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
<div className="flex gap-1 items-center justify-center">
<p>بعد از مرور تمام کارت ها، تمام زیر جعبه ها را به سمت راست شیف دهید...</p>
      <TfiShiftLeftAlt
        className='mt-2 text-3xl text-white p-1 rounded-full bg-green-400 mb-2'
        onClick={() => {
          shiftCardForward();
        }}
      />
      <button
        className='bg-green-400 p-3 rounded-full text-white'
        onClick={() => handleReturn()}
      >
        بازگشت
      </button>
</div>
    </div>
  );
}
