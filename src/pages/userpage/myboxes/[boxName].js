import Header from "@/components/header/Header";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

import styles from "./style.module.css";


import { CiSquarePlus } from "react-icons/ci";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useDispatch } from "react-redux";
import { me } from "@/redux/users/Users";
import {
  createANewCard,
  deleteCard,
  getCardsFromServer,
  updateCard
} from "@/redux/card/card";
import Swal from "sweetalert2";
import { getCourseTitle } from "@/redux/course/course";
import AutoReview from "@/components/autoReview/AutoReview";
import ManualReview from "@/components/manualReview/ManualReview";

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
  const [score, setScore] = useState(0);
  const [viewAnswer, setViewAnswer] = useState(false);
  const [retrievedCards, setRetrievedCards] = useState([]);
  const [userID, setUserID] = useState("");
  const [courseID, setCourseID] = useState(route.query.boxName);
  const [courseTitle, setCourseTitle] = useState("");
  const [userFirtName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [cartNum, setCartNum] = useState(0);
  const [autoReview, setAutoReview] = useState(false);
  const [reviewCartsAuto, setReviewCartsAuto] = useState([]);
  const [reviewMode, setReviewMode] = useState("none");



  useEffect(() => {
    const a = async () => {
      const result = await dispatch(me());
      console.log("result", result);
      if (result.payload.status === 200) {
        setUserID(result.payload.data._id);
        setUserFirstName(result.payload.data.firstName);
        setUserLastName(result.payload.data.lastName);
        setCourseID(route.query.boxName);
        const course = await dispatch(getCourseTitle(route.query.boxName));
        console.log("course data : ", course.payload.data);
        setCourseTitle(course.payload.data.title);
      } else {
        route.push("./login");
      }
    };
    a();
  }, []);

  const onReturn= ()=>{
    setReviewMode("none")
  }

  const updateAutoCarts = async () => {
    const user = await dispatch(me());
    const userID = user.payload.data._id;
    const courseID = route.query.boxName;
    const autoReviewCells = [1, 22, 34, 48, 66];
    const autoReviewCarts = [];
    autoReviewCells.map(async (index) => {
      const body = { boxNumber: index, userID, courseID };
      const res = await dispatch(getCardsFromServer(body));
      // console.log("res : ",index ,"++++", res)
      if (res.payload.status === 200) {
        // console.log("box : ", index)
        autoReviewCarts.push(...res.payload.data);
      }
      setReviewCartsAuto(autoReviewCarts);
    });
    // console.log("autttt : ", reviewCartsAuto)
  };

  const addCard = async () => {
    const cardBody = { question, answer, score: 1, userID, courseID };
    const response = await dispatch(createANewCard(cardBody));
    if (response.payload.status === 422) {
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba"
        },
        position: "bottom-end",
        title: "  این فلش کارت قبلا ثبت شده است ...",
        icon: "error"
      });
      setAnswer("");
      setQuestion("");
    } else if (response.payload.status === 200) {
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba"
        },
        position: "bottom-end",
        title: " فلش کارت با موفقیت ثبت شد ...",
        icon: "success"
      });
      setAnswer("");
      setQuestion("");
      handleClose();
    }
  };

  const selectCards = async (boxNumber) => {
    setScore(boxNumber);
    const user = await dispatch(me());
    const userID = user.payload.data._id;
    const courseID = route.query.boxName;
    console.log("user.... : ", userID);
    console.log("course.... : ", courseID);
    const body = { boxNumber, userID, courseID };
    const res = await dispatch(getCardsFromServer(body));
    console.log("res :", res);
    setRetrievedCards(res.payload.data);
    setCartNum(res.payload.data.length);
    return res.payload.data;
  };

  const goToNextBox = async ({ question, answer, score }) => {
    console.log("Question : ", question, "answer : ", answer);
    const user = await dispatch(me());
    const userID = user.payload.data._id;
    const courseID = route.query.boxName;
    console.log("user.... : ", userID);
    console.log("course.... : ", courseID);
    const body = { question, answer, score, userID, courseID, correct: true };
    console.log("body.... : ", body);
    const res = await dispatch(updateCard(body));
    console.log("ress ; ", res);
    if (res.payload.status === 200) {
      selectCards(score);
    }
  };
  const shiftToNextBox = async ({ question, answer, score }) => {
    console.log("Question : ", question, "answer : ", answer, "score:", score);
    const user = await dispatch(me());
    const userID = user.payload.data._id;
    const courseID = route.query.boxName;
    console.log("user.... : ", userID);
    console.log("course.... : ", courseID);
    const body = { question, answer, score, userID, courseID, correct: true };
    const res = await dispatch(updateCard(body));
    console.log("ress ; ", res);
    if (res.payload.status === 200) {
      selectCards(score);
    }
  };

  const goToFirstBox = async ({ question, answer }) => {
    const user = await dispatch(me());
    const userID = user.payload.data._id;
    const courseID = route.query.boxName;
    console.log("user.... : ", userID);
    console.log("course.... : ", courseID);
    const body = { question, answer, score, userID, courseID, correct: false };
    const res = await dispatch(updateCard(body));
    console.log("ress ; ", res);
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
    console.log(cardID);
    const res = await dispatch(deleteCard(cardID));
    console.log("res : ", res);
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
    const user = await dispatch(me());
    const userID = user.payload.data._id;
    const courseID = route.query.boxName;
    console.log("user.... : ", userID);
    console.log("course.... : ", courseID);
    console.log("boxmmmmmxxNumberrr : ", boxNumbers);
    boxNumbers.map(async (item) => {
      const cards = await selectCards(item);
      console.log("cardsss : ", cards);
      cards.map((newItem) => {
        console.log("new item : ", newItem);
        shiftToNextBox(newItem);
      });
    });
  };

  const handleAutoReview = () => {
    setAutoReview(!autoReview);
    const autoReviewCells = [1, 22, 34, 48, 66];
    const autoReviewCarts = [];
    autoReviewCells.map(async (index) => {
      const body = { boxNumber: index, userID, courseID };
      const res = await dispatch(getCardsFromServer(body));
      console.log("res :", res.payload.data);
      autoReviewCarts.push(...res.payload.data);
      setReviewCartsAuto(autoReviewCarts);
    });

    console.log("auto review carts : ", autoReviewCarts);
  };

  return (
    <div>
      <Header />
      {reviewMode === "none" && (
        <div className='flex flex-col justify-center items-center gap-4 h-[calc(100vh_-_80px)] w-full font-moraba-medium'>
          <div className="flex gap-2 justify-center items-center">
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
          <div className=" flex justify-center items-center gap-2">
          <div
            className='p-5 bg-green-400 hover:cursor-pointer'
            onClick={() => setReviewMode("auto")}
          >
            مرور خودکار جعبه
          </div>
          <div
            className='p-5 bg-green-400 hover:cursor-pointer'
            onClick={() => setReviewMode("manual")}
          >
            مرور دستی جعبه
          </div>
          </div>
         
        </div>
      )}

      {reviewMode === "auto" && <AutoReview boxData = {{courseTitle, userFirtName, userLastName, userID, courseID}} handleReturn={onReturn} />}
      {reviewMode === "manual" && <ManualReview boxData = {{courseTitle, userFirtName, userLastName, userID, courseID}} handleReturn={onReturn} />}

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
    props: {}
  };
}
