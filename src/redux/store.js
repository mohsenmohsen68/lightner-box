import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/users/Users"
import cardReducer from "@/redux/card/card"
import courseReducer from "@/redux/course/course"



const store = configureStore({
    reducer:{
        user: userReducer,
        card: cardReducer,
        course: courseReducer,

    }
})

export default store;