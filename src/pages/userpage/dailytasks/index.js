import Header from "@/components/header/Header";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { MdNotificationsOff } from "react-icons/md";
import { MdOutlineRemoveDone } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import { createTodos, deleteTodo, getTodosFromServer, updateTodos } from "@/redux/todos/todos";
import { useDispatch } from "react-redux";
import { me } from "@/redux/users/Users";
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

export default function index() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [todosToShow, setTodosToShow] = useState([])
  const [type, setType] = useState("")
  const [deadline, setDeadLine] = useState(new DateObject({ calendar: persian }))
  const [deadlineTime, setDeadlineTime] = useState(new DateObject({ calendar: persian }))
  const [userData, setUserData] = useState({})
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const a = async () => {
      const result = await dispatch(me());
      if (result.payload.status === 200) {
        setUserData(result.payload.data);
      } else {
        dispatch(userLogesOut());
        setUserData({});
      }
    };
    a();
  }, []);

  const handleTask = async (userID, todoType) => {
    const todosResult = await dispatch(getTodosFromServer({ userID, mytype: todoType }))
    console.log(todosResult.payload.data)
    setTodosToShow(todosResult.payload.data)

  }

  const clickHandler = async () => {
    console.log(type, title, deadline.toDate(), deadlineTime.toDate(), userData._id)
    const ddln = type === "روزانه" ? deadlineTime.toDate() : deadline.toDate();
    const body = { title, type, deadLine: ddln, status: "notDone", userID: userData._id, notify: false }
    const uploadedTask = await dispatch(createTodos(body))
    console.log("ffff : ", uploadedTask)
    if (uploadedTask.payload.status === 200) {

      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba"
        },
        position: "bottom-end",
        title: " تسک شما با موفقیت ثبت شد ...",
        icon: "success"
      });
      setTitle("")
      setDeadLine(new DateObject({ calendar: persian }))
      setDeadlineTime(new DateObject({ calendar: persian }))
      setType("")
      handleClose()

    } else {
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba"
        },
        position: "bottom-end",
        title: " متاسفانه مشکلی رخ داده است ...",
        icon: "success"
      });
    }

  }

const setDoneHandler = async(task) => {
  const taskNewStatus = task.status === "notDone" ? "Done":"notDone"
  const body = {title: task.title, status:taskNewStatus, type:task.type, userID:task.user, notify:task.notify, _id:task._id}
  const result = await dispatch(updateTodos(body))
  handleTask(task.user,task.type)
}

const setNotifyHandler = async(task)=>{
  const body = {title: task.title, status:task.status, type:task.type, userID:task.user, notify:!task.notify, _id:task._id}
  const result = await dispatch(updateTodos(body))
  handleTask(task.user,task.type)
}

const deleteHandler = async(task)=>{
  const taskID = task._id
  const result = await dispatch(deleteTodo(taskID))
  handleTask(task.user,task.type) 
}

  return (
    <div>
      <Header />
      <div className='w-full p-4 '>
        {/* add baily tasks ... */}
        <div className='w-full h-10 flex justify-center gap-2 mt-2 '>
          <button
            className=' rounded-full p-2 bg-green-500 hover:cursor-pointer text-md hover:text-white hover:bg-green-400 font-dana text-white'
            onClick={handleOpen}
          >
            <div className='flex justify-center items-center '>
              اضافه کردن کار جدید ...
              <FiPlus className=' text-2xl ' />
            </div>
          </button>
        </div>
        <div className='w-full h-10 flex justify-center gap-2 mt-2 '>
          <div className="w-1/4 bg-rose-400 shadow-lg flex justify-center items-center hover:cursor-pointer" onClick={() => handleTask(userData._id, "daily")}>
            کارهای روزانه
          </div>
          <div className="w-1/4 bg-sky-400 shadow-lg flex justify-center items-center hover:cursor-pointer" onClick={() => handleTask(userData._id, "weekly")}>
            کارهای هفتگی
          </div>
          <div className="w-1/4 bg-lime-400 shadow-lg flex justify-center items-center hover:cursor-pointer" onClick={() => handleTask(userData._id, "monthly")}>
            کارهای ماهانه
          </div>
        </div>

        {/* view the tasks status */}
        <div className='w-full mt-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
          {todosToShow.length >= 1 && todosToShow.map((item) => <div className={`shadow-lg hover:scale-105 transition-all ${item.status === "notDone" ? "bg-red-200" : "bg-green-200"}`} key={item._id}>
            <div className='flex flex-col gap-3 font-moraba justify-center items-center p-2'>
              <div>{item.title} </div>
              <div className='flex justify-center items-center text-2xl'>
              {item.status==="notDone" && <MdDoneAll className="text-green-400 hover:cursor-pointer mx-2" onClick={()=>setDoneHandler(item)} />}
                {item.status==="Done" && <MdOutlineRemoveDone  className="text-green-400 hover:cursor-pointer mx-2" onClick={()=>setDoneHandler(item)} />}
                {item.notify === true && <MdNotificationsActive className="text-orange-500 hover:cursor-pointer mx-2" onClick={()=>setNotifyHandler(item)} />}
                {item.notify === false && <MdNotificationsOff className="text-orange-500 hover:cursor-pointer mx-2" onClick={()=>setNotifyHandler(item)}/>}
                <RiDeleteBin3Line className="text-red-600 hover:cursor-pointer mx-2" onClick={()=>deleteHandler(item)} />
              </div>
            </div>
          </div>)}
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
            <div className='flex flex-col gap-3'>
              <input
                type='text'
                placeholder='عنوان تسک را وارد کنید ...'
                className='outline-none border p-2'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select name='type' id='type' className='outline-none border p-2' value={type} onChange={e => setType(e.target.value)}>
                <option value=''>--نوع تسک را مشخص کنید --</option>
                <option value='daily'>روزانه</option>
                <option value='weekly'>هفتگی</option>
                <option value='monthly'>ماهانه</option>
              </select>
              {(type === "weekly") && <DatePicker
                value={deadline}
                onChange={setDeadLine}
                minDate={new DateObject({ calendar: persian })}
                maxDate={new DateObject({ calendar: persian }).add(7, "days")}
                calendar={persian}
                locale={persian_fa}
                className='w-full p-2 bg-slate-500'
              />}
              {(type === "monthly") && <DatePicker
                value={deadline}
                onChange={setDeadLine}
                minDate={new DateObject({ calendar: persian })}
                maxDate={new DateObject({ calendar: persian }).add(31, "days")}
                calendar={persian}
                locale={persian_fa}

              />}
              {type === "daily" && <DatePicker
                disableDayPicker
                format='HH:mm:ss'
                value={deadlineTime}
                onChange={setDeadlineTime}
                plugins={[<TimePicker />]}
                calendar={persian}
                locale={persian_fa}
                calendarPosition='bottom-right'
              />}
              <button className='bg-green-500 p-2' onClick={clickHandler}>ثبت تسک</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
