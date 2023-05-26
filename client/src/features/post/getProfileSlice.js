import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfileInfo = createAsyncThunk(
  "/api/user/userProfile",
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

      const { data } = await axios.get(`/api/user/userInfo/${payload}`, config);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  profileInfo: null,
  profilePosts: null,
  isLoading: false,
  error: false,
  success: false,
};

// Then, handle actions in your reducers:
const getProfileSlice = createSlice({
  name: "profile info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfileInfo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfileInfo.fulfilled, (state, action) => {
      const {user,posts} = action.payload;
      state.profileInfo = user;
      state.profilePosts = posts;
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(fetchProfileInfo.rejected, (state, action) => {
      console.log("Error = ", action.payload);

      state.isLoading = false;
      state.error = true;
    });
  },
});

export default getProfileSlice.reducer;
