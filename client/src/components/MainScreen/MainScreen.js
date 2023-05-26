import React, { useEffect } from "react";
import "./MainScreen.css";
import Navbar from "../Navbar/Navbar";
import Main from "../Main/Main";
import { getAllPost } from "../../features/post/getAllPostSlice";
import Story from "../Story/Story";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import Follow from "../Follow/Follow";

function MainScreen() {
  const dispatch = useDispatch();
  const { isLoading, posts } = useSelector((store) => store.fetchAllPost);
  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="inner-app-wrapper">
        <div className="all-component-wrapper">
          <Story />
          <Post />
          {isLoading ? (
            <div className="wrapper-container">
              <h1
                style={{
                  fontSize: "3rem",
                  marginTop: "3rem",
                  textAlign: "center",
                }}
              >
                Loading...
              </h1>
            </div>
          ) : (
            <Main />
          )}
        </div>
        <Follow />
      </div>
    </div>
  );
}

export default MainScreen;
