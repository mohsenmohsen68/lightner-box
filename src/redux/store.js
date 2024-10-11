import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/Users"
import cardReducer from "./card/card"



const store = configureStore({
    reducer:{
        user: userReducer,
        card: cardReducer,
    }
})

export default store;