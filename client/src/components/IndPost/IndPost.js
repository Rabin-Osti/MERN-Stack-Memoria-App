import React, { useState, useRef } from "react";
import { AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiCommentDots } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import "./indPost.css";
import axios from "axios";
import { handleLike } from "../../features/post/getAllPostSlice";
import moment from "moment";
import { Link } from "react-router-dom";

function IndPost({ post }) {
  const inputRef = useRef(null);

  const [toggleComment, setToggleComment] = useState(false);
  const [comments, setComments] = useState([]);
  const { user } = useSelector((store) => store.loggedUser);
  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const handleLikePost = async (id) => {
    try {
      const { token } = user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.patch(
        `http://localhost:5000/api/post/like/${id}`,
        {},
        config
      );
    } catch (error) {
      console.log("patch req failed = ", error.message);
    }
    dispatch(handleLike({ id, username: user.username }));
  };
  const handleComment = async (id) => {
    try {
      const { token } = user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/post/indcomment/${id}`,
        config
      );
      setToggleComment((prev) => !prev);
      if (data.length > 0) {
        setComments(data);
      }
    } catch (error) {
      console.log("get ind post comment FAILED = ", error.message);
    }
  };

  const handlePostComment = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/post/comment/${id}`,
        { text: inputRef.current.value },
        config
      );
      inputRef.current.value = "";
      const { data } = await axios.get(
        `http://localhost:5000/api/post/indcomment/${id}`,
        config
      );
      setComments(data);
    } catch (error) {
      console.log("error while adding comment = ", error.message);
    }
  };
  return (
    <div className="ind-wrapper">
      <div className="ind-top">
        <img src={post.ownerpic} alt="profile" />
        <div className="ind-info">
          <Link to={`/profile/${post.ownerId}`}>
            <span>{post.owner}</span>
          </Link>
          {post.createdAt && (
            <span>
              {moment(
                post.createdAt.slice(0, 10).replaceAll("-", ""),
                "YYYYMMDD"
              ).fromNow()}
            </span>
          )}
        </div>
      </div>
      <div className="ind-content">
        <span>{post.text}</span>

        {post.imgUrl && (
          <img src={`/images/uploads/${post.imgUrl}`} alt="story" />
        )}
      </div>
      <div className="ind-actions">
        <div className="ind-icons" onClick={() => handleLikePost(post._id)}>
          <AiFillHeart
            color={
              post.likes && post.likes.includes(user.username)
                ? "#FF1493"
                : "black"
            }
          />
          <span>{post.likes && post.likes.length} Likes</span>
        </div>
        <div className="ind-icons" onClick={() => handleComment(post._id)}>
          <BiCommentDots />
          <span>Comment</span>
        </div>
        <div className="ind-icons">
          <AiOutlineShareAlt />
          <span>Share</span>
        </div>
      </div>
      {toggleComment && (
        <div className="ind-comment-section">
          <div className="ind-comment-post">
            <div className="ind-comment-top">
              <img src={user.image} alt="" />
              <input type="text" placeholder="Write a comment" ref={inputRef} />
            </div>
            <button onClick={() => handlePostComment(post._id)}>Post</button>
          </div>
          {comments.length > 0 &&
            comments.map((ind, index) => (
              <div className="ind-comment-section">
                <div className="ind-comment-post">
                  <div className="ind-comment-top edit">
                    <img src={ind.ownerpic} alt="profile" />
                    <div className="ind-info">
                      <link rel="import" href="component.html" />
                      <span style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                        {ind.owner}
                      </span>
                      <span style={{ fontWeight: "500" }}>
                        a few second ago
                      </span>
                    </div>
                  </div>
                  <span className="ind-comment-text">{ind.text}</span>
                  {post.ownerId === user._id && <button>Reply</button>}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default IndPost;
