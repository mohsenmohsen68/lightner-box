import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/users/Users"
import cardReducer from "@/redux/card/card"
import courseReducer from "@/redux/course/course"
import weeklyProgramReducer from "./weeklyProgram/weeklyProgram";



const store = configureStore({
    reducer:{
        user: userReducer,
        card: cardReducer,
        course: courseReducer,
        weeklyProgram : weeklyProgramReducer,
    }
})

export default store;