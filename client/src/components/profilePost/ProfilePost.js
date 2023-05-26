import React from "react";
import "./profilePost.css";
import IndPost from "../IndPost/IndPost";

function ProfilePost({ posts }) {
  return (
    <div className="profile-post-wrapper">
      {(posts&&
      posts.map((post, index) => <IndPost post={post} key={index} />)
  )}
  {
    !posts && <h2 style={{fontSize:"3rem",width:"100%",marginTop:"3rem",fontWeight:"500",textAlign:"center"}}>Hasn't posted yet.</h2>
  }
  
    </div>
  );
}

export default ProfilePost;
