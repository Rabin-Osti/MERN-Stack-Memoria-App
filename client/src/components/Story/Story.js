import React from "react";
import { TiPlus } from "react-icons/ti";
import "./Story.css";

function Story() {
  return (
    <div className="story-wrapper">
      <div className="ind-story-wrapper">
        <img src="/images/story/1.jpg" alt="" />
        <span className="add-circle">
          <label htmlFor="upload-story" className="add-story align-center">
            <TiPlus />
          </label>
          <input type="file" id="upload-story" style={{ display: "none" }} />
        </span>
      </div>
      <div className="ind-story-wrapper">
        <img src="/images/story/2.jpg" alt="" />
        <span>Kakashi Hatake</span>
      </div>
      <div className="ind-story-wrapper">
        <img src="/images/story/3.jpg" alt="" />
        <span>John Doe</span>
      </div>
      <div className="ind-story-wrapper">
        <img src="/images/story/4.jpg" alt="" />
        <span>Haku</span>
      </div>
      <div className="ind-story-wrapper">
        <img src="/images/story/5.jpg" alt="" />
        <span>Yagami Light</span>
      </div>
    </div>
  );
}

export default Story;
