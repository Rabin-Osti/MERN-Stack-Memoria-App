import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllUserInfo } from "../../features/post/getUserInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import "./follow.css";
import axios from "axios";
function Follow() {
  const [followers, setFollowers] = useState([]);
  const dispatch = useDispatch();
  const { userInfo, isLoading } = useSelector((store) => store.fetchUserInfo);
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

  useEffect(() => {
    dispatch(fetchAllUserInfo());
  }, [dispatch]);

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
  if (isLoading) return <h1>Loading please wait</h1>;
  return (
    <div className="follow-container">
      <h3>Connect with others</h3>
      {userInfo && userInfo.length > 0 ? (
        userInfo
          .filter((ind) => ind._id !== user._id)
          .map((ind) => (
            <div className="inner-follow" key={ind._id}>
              <div className="ind-follow">
                <img src={ind.image} alt="user" />
                <span>
                  <Link to={`/profile/${ind._id}`}>{ind.username}</Link>
                </span>
              </div>

              <button
                onClick={() => handleFollowAction(ind._id)}
                className={
                  followers.includes(ind._id) ? "followed" : "notFollowed"
                }
              >
                {followers.includes(ind._id) ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))
      ) : (
        <h4>No user available</h4>
      )}
    </div>
  );
}

export default Follow;
