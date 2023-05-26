import React, { useEffect } from "react";
import "./profilescreen.css";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import ProfileTop from "../ProfileTop/ProfileTop";
import { fetchProfileInfo } from "../../features/post/getProfileSlice";
import ProfilePost from "../profilePost/ProfilePost";
import { useParams } from "react-router-dom";
function ProfileScreen() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, profilePosts } = useSelector((store) => store.userProfile);

  useEffect(() => {
    dispatch(fetchProfileInfo(id));
  }, [dispatch, id]);
  return (
    <>
      <Navbar />
      <div className="profile-screen-container">
        <div style={{ width: "60vw", margin: "0 auto" }}>
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
            <>
              <ProfileTop />
              <ProfilePost posts={profilePosts} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileScreen;
