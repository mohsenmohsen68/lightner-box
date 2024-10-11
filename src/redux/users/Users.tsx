import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsersFromServer = createAsyncThunk(
  "users/getUsersFromServer",
  async (url: string) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const createANewUser = createAsyncThunk(
  "users/createANewUser",
  async (userBody) => {
    console.log("nnnn : ", userBody);
    return fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const signUpUser = createAsyncThunk(
  "users/signUpUser",
  async (userBody) => {
    console.log("nnnn : ", userBody);
    return fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userBody) => {
    console.log("nnnn : ", userBody);
    return fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userBody) => {
    console.log("nnnn : ", userBody);
    return fetch("api/user", {
      method: "PUT",
      body: JSON.stringify(userBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getUsersFromServer.fulfilled, (state: people[], action) => {
      console.log("action data : ", action.payload.data);
      return action.payload.data;
      // state.concat(...action.payload.data);
    });
    builder.addCase(createANewUser.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
  }
});

export default slice.reducer;
// interface User {
//     firstName: "",
//     lastName: "",
//     userName: "",
//     userCode: "",
//     fathersName: "",
//     school: "",
//     age: "",
//     grade: "",
//     phoneNumber: "",
//     password: "",
//     password2: "",
//     img: ""
//   }

//   type Actions = {
//     type:string,
//     payload:string
//   }

// export const AddUserAction = (user:User)=>{
//     return{
//         type:"ADD_USER",
//         payload:user
//     }
// }
// export const UpdateUserAction = (user:User)=>{
//     return{
//         type:"UPDATE_USER",
//         payload:user
//     }
// }
// export const DeleteUserAction = (id:number)=>{
//     return{
//         type:"DELETE_USER",
//         payload:id
//     }
// }

// const UserReducer=(state:User[], action:Actions)=>{
//     switch(action.type){
//         case "DELETE_USER":{

//         }
//         case "ADD_USER":{

//         }
//         case "UPDATE_USER":{

//         }
//         case Default:{
//            return state;
//         }
//     }

// }
// export default UserReducer;
