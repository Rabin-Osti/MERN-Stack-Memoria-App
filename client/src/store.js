import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/auth/loginSlice";
import getAllPostSlice from "./features/post/getAllPostSlice";
import getProfileSlice from "./features/post/getProfileSlice";
import getUserInfoSlice from "./features/post/getUserInfoSlice";

export const store = configureStore({
  reducer: {
    loggedUser: loginSlice,
    fetchAllPost: getAllPostSlice,
    fetchUserInfo: getUserInfoSlice,
    userProfile: getProfileSlice
  },
});
