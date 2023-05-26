import React, { useEffect } from "react";
import "./App.css";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainScreen from "./components/MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocal } from "./features/auth/loginSlice";
import ProfileScreen from "./components/profileScreen/ProfileScreen";

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.loggedUser);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getFromLocal());
    }
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainScreen />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile/:id",
      element: user?<ProfileScreen />:<Login />
    },
    {
      path: "/register",
      element: <Register />,
    },
    
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
