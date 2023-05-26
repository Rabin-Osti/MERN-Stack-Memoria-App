import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPost = createAsyncThunk(
  "/api/post",
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

      const { data } = await axios.get("/api/post", config);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  posts: null,
  isLoading: false,
  error: false,
  success: false,
};

// Then, handle actions in your reducers:
const getAllPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    handleLike: (state, action) => {
      const { id, username } = action.payload;
      state.posts.forEach((element) => {
        if (element._id === id) {
          const index = element.likes.indexOf(username);
          if (index > -1) {
            element.likes.splice(index, 1);
          } else {
            element.likes.push(username);
          }
        }
      });
    },
    handleAddPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(getAllPost.rejected, (state, action) => {
      console.log("Error = ", action.payload);

      state.isLoading = false;
      state.error = true;
    });
  },
});
export const { handleLike, handleAddPost } = getAllPostSlice.actions;

export default getAllPostSlice.reducer;
