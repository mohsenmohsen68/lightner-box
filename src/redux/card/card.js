import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCardsFromServer = createAsyncThunk(
  "cards/getCardsFromServer",
  async (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const createANewCard = createAsyncThunk(
  "cards/createANewCard",
  async (cardBody) => {
    console.log("nnnn : ", cardBody);
    return fetch("/api/card/route",{
      method: "POST",
      body: JSON.stringify(cardBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);




export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (cardBody) => {
    console.log("nnnn : ", cardBody);
    return fetch("api/card", {
      method: "PUT",
      body: JSON.stringify(cardBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "cards",
  initialState: [],
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCardsFromServer.fulfilled, (state, action) => {
      console.log("action data : ", action.payload.data);
      return action.payload.data;
    });
    builder.addCase(createANewCard.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(updateCard.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
  }
});

export default slice.reducer;
