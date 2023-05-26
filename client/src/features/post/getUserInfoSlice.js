import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUserInfo = createAsyncThunk(
  "/api/users",
  async (payload, thunkAPI) => {
    try {
      const { loggedUser } = thunkAPI.getState();
      const { user } = loggedUser;
      const { token } = user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/api/users/userInfo", config);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userInfo: null,
  isLoading: false,
  error: false,
  success: false,
};

// Then, handle actions in your reducers:
const getUserInfoSlice = createSlice({
  name: "userInfo of followers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUserInfo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(fetchAllUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default getUserInfoSlice.reducer;
