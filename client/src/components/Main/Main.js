import React from "react";
import "./Main.css";
import IndPost from "../IndPost/IndPost";
import { useSelector } from "react-redux";
function Main() {
  const {posts} = useSelector(store => store.fetchAllPost);
  
  return (
    <div className="wrapper-container">
      {posts? (
        posts.map((post, index) => <IndPost post={post} key={index} />)
      ) : (
        <h1>No posts available. Please try again later.</h1>
      )}
    </div>
  );
}

export default Main;
