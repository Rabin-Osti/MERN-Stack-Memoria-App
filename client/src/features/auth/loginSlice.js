import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "/api/login",
  async (payload, thunkAPI) => {
    try {
      const { email, password } = payload;

      const { data } = await axios.post("/api/login", { email, password });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: false,
  success: false,
};

// Then, handle actions in your reducers:
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getFromLocal: (state) => {
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    handleLogout: (state)=>{
      localStorage.removeItem("user");
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      delete action.payload.followedTo;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});
export const { getFromLocal, handleFollow,handleLogout } = loginSlice.actions;

export default loginSlice.reducer;
