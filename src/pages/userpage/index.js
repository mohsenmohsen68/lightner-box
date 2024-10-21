import Header from "@/components/header/Header";
import { me, userLogesIn, userLogesOut } from "@/redux/users/Users";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BsBoxes } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createANewCourse } from "@/redux/course/course";

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

function index() {
  const [open, setOpen] = useState(false);
  const [boxName, setBoxName] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clickHandler = () => {
    console.log("box name : ", boxName);
    const userID = userData._id;
    const boxBody = {boxName, userID}
    const res = dispatch(createANewCourse(boxBody))
    console.log("res : ", res)
    handleClose();
  };

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const a = async () => {
      const result = await dispatch(me());
      console.log("result", result);
      if (result.payload.status === 200) {
        setIsUserLoggedIn(true);
        dispatch(userLogesIn());
        setUserData(result.payload.data);
      } else {
        setIsUserLoggedIn(false);
        dispatch(userLogesOut());
        setUserData({});
      }
    };
    a();
  }, []);
  return (
    <div>
      <Header userStatus={isUserLoggedIn} />
      <div className='mt-3 flex justify-between items-center bg-emerald-500 hover:bg-emerald-400 text-white mx-0 sm:mx-10 py-5 px-10 font-moraba-medium'>
        <div className='flex flex-col justify-center w-1/3 items-center'>
          <div>{userData.firstName}</div>
          <div>{userData.lastName}</div>
        </div>
        <div className='flex flex-col w-1/3 justify-center items-center'>
          <div>تعداد جعبه ها</div>
          <div>5</div>
        </div>
        <div className='flex justify-center  items-center w-1/3 flex-col'>
          <div>تعداد سوال‌ها</div>
          <div>{2500}</div>
        </div>
      </div>
      <div className=' flex gap-3 mt-3 font-moraba-medium text-white  mx-0 sm:mx-10'>
        <div
          onClick={() => router.push("/userpage/myboxes")}
          className='flex justify-center gap-5 items-center h-full bg-blue-500 w-1/2 py-5 hover:bg-blue-400 hover:cursor-pointer'
        >
          <div className='text-black'>جعبه های من</div>
          <BsBoxes className='text-6xl' />
        </div>
        <div
          onClick={handleOpen}
          className='flex justify-center items-center gap-5 bg-amber-500 hover:bg-amber-400 hover:cursor-pointer w-1/2 py-5'
        >
          <div className='text-black'>اضافه کردن جعبه جدید</div>
          <FaBoxOpen className='text-6xl' />
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
            <p
              className='font-dana-medium'
              id='transition-modal-title'
              variant='h6'
              component='h2'
            >
              نام جعبه جدید را انتخاب کنید :
            </p>
            <div className='flex justify-center items-center border rounded-full w-full my-2'>
              <input
                type='text'
                className='font-dana-medium w-9/12 mr-2 mt-2 block mb-2 border-none outline-none '
                placeholder='عنوان دوره ...'
                onChange={(e) => setBoxName(e.target.value)}
                value={boxName}
              />
              <FaBoxOpen className='text-amber-500 text-3xl' />
            </div>
            <div className='w-full flex items-center justify-end'>
              <button
                className='font-dana p-2 bg-green-500 hover:bg-green-600 text-white rounded-full justify-end'
                onClick={() => clickHandler()}
              >
                اضافه کن
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default index;
