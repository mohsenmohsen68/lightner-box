import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/users/Users"
import cardReducer from "@/redux/card/card"



const store = configureStore({
    reducer:{
        user: userReducer,
        card: cardReducer,
        

    }
})

export default store;