import mongoose from "mongoose";
import Post from "./postSchema.js";

const commentSchema = mongoose.Schema(
  {
    postId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    text: {
      type: String,
      required: [true, "Comment can't be empty"],
    },
    owner: {
      type: String,
      required: true,
    },
    ownerpic: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
