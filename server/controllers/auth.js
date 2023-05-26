import bcrypt from "bcryptjs";
import User from "../model/userSchema.js";
import Post from "../model/postSchema.js";
import jwt from "jsonwebtoken";
import createError from "../utils/customError.js";
export const register = async (req, res, next) => {
  try {
    if (req.body.username && req.body.password && req.body.email) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      await User.create({ ...req.body, password: hash });
      return res.status(201).json("User create succesfully");
    }

    next(createError(406, "Please provide all the credentials"));
    throw new Error();
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    if (req.body.email && req.body.password) {
      const user = await User.findOne({ email: req.body.email });

      if (!user) return next(createError(404, "User not found in the DB"));

      const check = bcrypt.compareSync(req.body.password, user.password);

      if (!check) return next(createError(401, "Invalid email or passoword"));

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({ ...user._doc, token });
    }
    return next(createError(406, "Must provide all credentials"));
  } catch (error) {
    next(error);
  }
};
export const userInfo = async (req, res, next) => {
  try {
    const users = await User.find({}, { email: 0, password: 0 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const profileInfo = async (req, res, next) => {
  try {
    const {id} = req.params;
    if(!id) return createError(404,"No user found. Please try again later.");
    const user = await User.findOne({_id:id}, { email: 0, password: 0});
    if(!user) return createError(404,"No user found. Please try again later.");
    const posts = await Post.find({ownerId:id});
    res.status(200).json({user,posts});
  } catch (error) {
    next(error);
  }
};

export const updateFollower = async (req, res, next) => {
  try {
    const {id} = req.params;
    if(!id) return createError(404,"No user exists. Please try again later.");
    const user = await User.findOne({_id:id});
    if(!user) return createError(404,"No user found in DB. Please try again later.");
    const check = req.user.followedTo.includes(id);
    if(check)
    {
    User.findByIdAndUpdate(req.user._id,)
    await User.findByIdAndUpdate(req.user._id,{ $pull: {followedTo:id}})
    return res.status(201).json("pull request");
    }
    await User.findByIdAndUpdate(req.user._id,{ $push: {followedTo:id}});
    return res.status(201).json("push request");
  } catch (error) {
    next(error);
  }
};

export const followersList = async (req, res, next) => {
  try {
    return res.status(201).json(req.user.followedTo);
  } catch (error) {
    next(error);
  }
};