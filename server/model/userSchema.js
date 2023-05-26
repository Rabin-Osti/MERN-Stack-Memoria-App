import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Must provide username"],
      unique: [true, "Username already taken"],
    },
    email: {
      type: String,
      required: [true, "Must provide email"],
      unique: [true, "Email already taken"],
    },
    password: {
      type: String,
      required: [true, "Must provide password"],
    },
    image: {
      type: String,
    },
    followedTo: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
