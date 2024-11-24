import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTodosFromServer = createAsyncThunk(
  "todos/getTodosFromServer",
  async ({userID,mytype}) => {
    console.log("tyyypppeeee : ", {userID,mytype})
    return fetch(`/api/todos?userID=${userID}&mytype=${mytype}`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const updateTodos = createAsyncThunk(
  "Todos/updateTodos",
  async (Body) => {
    return fetch("/api/todos", {
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
export const deleteTodo = createAsyncThunk(
  "Todos/deleteTodo",
  async (todoID) => {
    return fetch(`/api/todos?todoID=${todoID}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => data)
  }
)
export const createTodos = createAsyncThunk(
  "Todos/createTodos",
  async (Body) => {
    return fetch("/api/todos", {
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
  name: "Todos",
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getTodosFromServer.fulfilled, (state, action) => {
      return action.payload.data;
      // state.concat(...action.payload.data);
    });
    builder.addCase(createTodos.fulfilled, (state, action) => {
    });
    builder.addCase(updateTodos.fulfilled, (state, action) => {
    });
    builder.addCase(deleteTodos.fulfilled, (state, action) => {
    });
  }
});

export default slice.reducer;
