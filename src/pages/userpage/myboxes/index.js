import Header from '@/components/header/Header'
import { getCoursesFromServer } from '@/redux/course/course';
import { me } from '@/redux/users/Users'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function index() {

  const [userData, setUserData] = useState({});
  const router = useRouter();
  const [userCourses, setUserCourses] = useState([]);
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  useEffect(()=>{
    const a = async () => {
      const result = await dispatch(me());
      console.log("result", result);
      if (result.payload.status === 200) {
       const coursesRes = await dispatch(getCoursesFromServer(result.payload.data._id))
       console.log('course result : ', coursesRes)
       setUserCourses(coursesRes.payload.data)
      } else {
       setUserData({});8
      }
    };
    a();
  },[])
  return (
    <div>
        <Header/>
        <div className='w-full h-[calc(100vh_-_80px)] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-center items-center gap-3 p-3 font-moraba-medium  '>
           {userCourses.map(course => (
             <div className='flex justify-center items-center w-40 h-40 bg-rose-500 text-white rounded-2xl shadow-md hover:bg-rose-600 hover:shadow-inner p-2 hover:-translate-y-1 transition-all' onClick={()=>{router.push(`/userpage/myboxes/${course._id.trim()}`)}}>{course.title}</div>
             ))}
         </div>
    </div>
  )
}

export default index