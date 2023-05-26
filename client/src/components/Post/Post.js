import React, { useState, useRef } from "react";
import axios from "axios";
import { FcAddImage } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { handleAddPost } from "../../features/post/getAllPostSlice";
import "./Post.css";
function Post() {
  const dispatch = useDispatch();
  const textRef = useRef(null);
  const clickRef = useRef(null);

  const [file, setFile] = useState(null);
  const { user } = useSelector((store) => store.loggedUser);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const upload = async () => {
    try {
      console.log("uploading....");
      const formData = new FormData();
      formData.append("file", file);
      console.log("this is formData = ", formData.get("file"));
      const res = await axios.post(
        "http://localhost:5000/api/uploads",
        formData,
        config
      );
      console.log("upload complete");

      return res.data;
    } catch (error) {
      console.log("error while adding image in the db = ", error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      let imgUrl = "";
      if (file) imgUrl = await upload();
      const { data } = await axios.post(
        `http://localhost:5000/api/post`,
        { text: textRef.current.value, imgUrl },
        config
      );
      console.log("post req of post complete and recived data is = ", data);
      dispatch(handleAddPost(data));
      setFile(null);
      textRef.current.value = "";
    } catch (error) {
      console.log("error after adding image in db ", error.message);
    }
  };
  return (
    <div className="post-container">
      <div className="post-top">
        <img src={user.image} alt="profile" className="post-top-img" />
        <textarea rows="2" placeholder="What is on your mind?" ref={textRef} />
      </div>
      <div>
        {file && (
          <img
            className="uploaded-file"
            alt=""
            src={URL.createObjectURL(file)}
          />
        )}
      </div>
      <div className="light-border"></div>
      <div className="post-bottom">
        <div className="post-right">
          <div className="post-icon-wrapper">
            <FcAddImage
              size={25}
              htmlFor="upload"
              onClick={() => clickRef.current.click()}
            />
            <label htmlFor="upload" ref={clickRef}>
              Add Image
            </label>
            <input
              type="file"
              id="upload"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
        <div className="post-left">
          <button onClick={handleSubmit}>Post</button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Post;
