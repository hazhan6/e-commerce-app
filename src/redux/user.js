import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  user: [],
};

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async ({ userId }) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default user.reducer;
