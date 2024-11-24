import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProgramFromServer = createAsyncThunk(
  "Program/getProgramFromServer",
  async (userID) => {
    return fetch(`/api/program?userID=${userID}`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const updateProgram = createAsyncThunk(
  "Program/updateProgram",
  async (Body) => {
    console.log("nnnn : ", Body);
    return fetch("/api/program", {
      method: "PUT",
      body: JSON.stringify(Body),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);
export const createProgram = createAsyncThunk(
  "Program/createProgram",
  async (Body) => {
    console.log("nnnn : ", Body);
    return fetch("/api/program", {
      method: "POST",
      body: JSON.stringify(Body),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "Program",
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getProgramFromServer.fulfilled, (state, action) => {
      return action.payload.data;
      // state.concat(...action.payload.data);
    });
    builder.addCase(createProgram.fulfilled, (state, action) => {
    });
    builder.addCase(updateProgram.fulfilled, (state, action) => {
    });
  }
});

export default slice.reducer;
