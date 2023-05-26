import mongoose from "mongoose";
import User from "./userSchema.js";
import moment from "moment";

const postSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, "Post can't be empty"],
  },
  owner: {
    type: String,
    required: true,
  },
  ownerId:{
    type: mongoose.Schema.Types.ObjectId,
    required: [true,"Must provide the owner Id of the post"]
  },
  ownerpic: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  likes: {
    type: [String],
  },
},{timestamps: true});

export default mongoose.model("Post", postSchema);
