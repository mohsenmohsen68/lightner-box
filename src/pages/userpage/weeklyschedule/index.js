import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("./../../../components/WriteProgram/Editor"),
  {
    ssr: false
  }
);

import Header from "@/components/header/Header";
import React, { useEffect, useState } from "react";
import { createProgram, getProgramFromServer, updateProgram } from "@/redux/weeklyProgram/weeklyProgram";
import { useDispatch } from "react-redux";
import { me} from "@/redux/users/Users";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

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

export default function index() {

  const [programData, setProgramData] = useState("");
  const [thereISNoSchedule, setThereIsNoSchedule] = useState(false);
  const [userData, setUserData] = useState({});
  const [html, setHTML] = useState('');
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {

    const a = async () => {
      const result = await dispatch(me());
      console.log("result", result.payload.data);
      if (result.payload.status === 200) {
        setUserData(result.payload.data);
        const schedule = await dispatch(getProgramFromServer(result.payload.data._id))
        console.log("schedule : ", schedule)
        if(schedule.payload.status === 200){
          setHTML(schedule.payload.data.html);
        }
      } else {
        setUserData({});
        router.push('/login')
      }
    };
    a();
  }, []);

const handleCreate =async() => {
  console.log("programData : ", userData)
  const body = {
    userID: userData._id,
    html: programData
  }
  const userProgram =await dispatch(createProgram(body))
  console.log(userProgram)
  if(userProgram.payload.status === 422){
    Toast.fire({
      toast: true,
      customClass: {
        title: "font-moraba"
      },
      position: "bottom-end",
      title: "  این برنامه قبلا ایجاد شده است ...",
      icon: "error"
    });
  }else if (userProgram.payload.status === 200){
    Toast.fire({
      toast: true,
      customClass: {
        title: "font-moraba"
      },
      position: "bottom-end",
      title: "  برنامه با موفقیت ثبت گردید ...",
      icon: "success"
    });
  }
}

const handleUpdate =async() => {
  console.log("programData : ", userData)
  const body = {
    userID: userData._id,
    html: programData
  }
  const userProgram =await dispatch(updateProgram(body))
  if(userProgram.payload.status === 500){
    Toast.fire({
      toast: true,
      customClass: {
        title: "font-moraba"
      },
      position: "bottom-end",
      title: "  مشکلی رخ داده است ...",
      icon: "error"
    });
  }else if (userProgram.payload.status === 200){
    Toast.fire({
      toast: true,
      customClass: {
        title: "font-moraba"
      },
      position: "bottom-end",
      title: "  بروز رسانی با موفقیت ثبت گردید ...",
      icon: "success"
    });
  }
}

const handleProgram = (mydata) =>{
  setProgramData(mydata)
}

  return (
    <div>
      {console.log("html : ", html)}
      <Header />
      <div className='flex flex-col p-4 gap-2 w-full h-[calc(100vh_-_80px)] justify-between'>
        {/* div for user identities .. */}
        <div className='w-full bg-sky-400 h-20 text-white flex font-moraba-medium hover:bg-sky-300 justify-evenly items-center'>
          <div className='font-moraba'>{userData.firstName}  {userData.lastName}</div>
          <div className='font-moraba-demiBold'>برنامه هفتگی</div>
          <div className='font-moraba'>
            {(1403).toLocaleString("fa-ir")}/{(3).toLocaleString("fa-ir")}/
            {(21).toLocaleString("fa-ir")}
          </div>
        </div>
        {/* div for there is no schedule */}
        {thereISNoSchedule && (
          <div className='w-full bg-sky-400 h-20 text-white flex font-moraba-medium hover:bg-sky-300 justify-center items-center'>
            <p>هنوز برنامه ی هفتگی برای خود نساخته اید ...</p>
          </div>
        )}
        {/* div for weekly schedule */}
        {!thereISNoSchedule && (
          <div className='bg-red-400 w-full h-full'>
            <Editor onHandleAddProgram={handleProgram} userID={userData._id} htmlContent={html}/>
          </div>
        )}
        {/* div for adding or edditing weekly schedule */}
        <div className='flex justify-center items-center'>
          <button className='bg-green-400 font-moraba-medium text-white p-2 ml-2' onClick={handleCreate}>
            ایجاد برنامه هفتگی جدید{" "}
          </button>
          <button className='bg-sky-400 font-moraba-medium text-white p-2 ml-2' onClick={handleUpdate}>
            بروز رسانی جدول فعلی{" "}
          </button>
          <button className='bg-orange-400 font-moraba-medium text-white p-2' onClick={()=>router.push('/userpage')}>
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}
