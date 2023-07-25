import axios from "axios";
import jwt_decode from "jwt-decode";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isUserLoggedIn: getFromLocalStorage("isUserLoggedIn"),
  userId: getFromLocalStorage("userId"),
};

export const login = createAsyncThunk(
  "login",
  async ({ username, password }) => {
    try {
      const response = await axios.post(
        `https://fakestoreapi.com/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.token) {
        const decoded = jwt_decode(response.data.token);
        saveToLocalStorage({ key: "isUserLoggedIn", data: true });
        saveToLocalStorage({ key: "userId", data: decoded.sub });
        return { isUserLoggedIn: true, userId: decoded.sub };
      }
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const signUp = createAsyncThunk("signUp", async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isUserLoggedIn = false;
      state.userId = "";
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isUserLoggedIn = action.payload.isUserLoggedIn;
      state.userId = action.payload.userId;
    });
  },
});

export const { logout } = auth.actions;
export default auth.reducer;
