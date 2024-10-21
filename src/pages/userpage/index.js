import Header from "@/components/header/Header";
import { me, userLogesIn, userLogesOut } from "@/redux/users/Users";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function index() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const a = async () => {
      const result = await dispatch(me());
      console.log("result", result);
      if (result.payload.status === 200) {
        setIsUserLoggedIn(true);
        dispatch(userLogesIn())
        setUserData(result.payload.data);
      } else {
        setIsUserLoggedIn(false);
        dispatch(userLogesOut())
        setUserData({});
      }
    };
    a();
  }, []);
  return (
    <div>
      <Header userStatus={isUserLoggedIn} />
      <div className=' h-fit flex justify-between items-center bg-emerald-400 text-white mx-5 py-5 px-10 font-moraba-medium'>
        <div className='flex flex-col justify-center w-1/3 items-center'>
          <div>
            {userData.firstName}
            </div> 
            <div>
              {userData.lastName}
              </div>
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
    </div>
  );
}

export default index;
