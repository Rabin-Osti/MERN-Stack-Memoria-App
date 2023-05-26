import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profiletop.css";
import { useSelector } from "react-redux";
function ProfileTop() {
  const [followers, setFollowers] = useState([]);

  const { profileInfo } = useSelector((store) => store.userProfile);
  const { user } = useSelector((store) => store.loggedUser);
  const { token } = user;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const getFollowers = async () => {
      const { data } = await axios.get("/api/followers/followersList", config);
      setFollowers(data);
    };
    getFollowers();
  }, []);
  const handleFollowAction = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/follow/${id}`, {}, config);
      if (followers.includes(id)) {
        setFollowers((prev) => prev.filter((ind) => ind !== id));
      } else {
        setFollowers((prev) => [...prev, id]);
      }
    } catch (error) {
      console.log("follow/unfollow patch req failed = ", error.message);
    }
  };

  return (
    <div className="profiletop-container">
      <img
        src="/images/cover/1.jpg"
        alt="cover"
        className="profile-cover-img"
      />
      <div className="user-profile-info">
        <div>
          <img src={profileInfo && profileInfo.image} alt="cover" />
          <span>{profileInfo && profileInfo.username}</span>
        </div>
        {profileInfo && profileInfo._id !== user._id && (
          // <button onClick={handleFollowAction}>Follow</button>

          <button
            onClick={() => handleFollowAction(profileInfo._id)}
            className={
              followers.includes(profileInfo._id) ? "followed" : "notFollowed"
            }
          >
            {followers.includes(profileInfo._id) ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileTop;
