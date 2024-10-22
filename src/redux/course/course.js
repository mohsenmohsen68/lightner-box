import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCoursesFromServer = createAsyncThunk(
  "courses/getCoursesFromServer",
  async (teacherID) => {
    return fetch(`/api/course/route?teacherID=${teacherID}`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const createANewCourse = createAsyncThunk(
  "courses/createANewCourse",
  async (courseBody) => {
    return fetch("/api/course/route",{
      method: "POST",
      body: JSON.stringify(courseBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);


export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (courseBody) => {
    console.log("nnnn : ", courseBody);
    return fetch("api/course/route", {
      method: "PUT",
      body: JSON.stringify(courseBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCoursesFromServer.fulfilled, (state, action) => {
      console.log("action data : ", action.payload.data);
      return action.payload.data;
      // state.concat(...action.payload.data);
    });
    builder.addCase(createANewCourse.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
  }
});

export default slice.reducer;
