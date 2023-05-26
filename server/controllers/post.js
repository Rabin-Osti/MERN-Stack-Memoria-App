import Post from "../model/postSchema.js";
import createError from "../utils/customError.js";
import Comment from "../model/commentSchema.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    next(createError(500, "Post couldn't be fetched"));
  }
};
export const createPost = async (req, res, next) => {
  try {
    console.log("this is req user = ", req.user);
    if (req.body.text) {
      const newPost = await Post.create({
        text: req.body.text,
        imgUrl: req.body.imgUrl,
        owner: req.user.username,
        ownerId: req.user._id,
        ownerpic: req.user.image,
      });
      return res.status(201).json(newPost);
    }
    next(createError(406, "Post can't be empty"));
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const { username } = req.user;
    const postId = req.params.id;
    if (username && postId) {
      const post = await Post.findOne({ _id: postId });
      const check = post.likes.includes(username);
      if (check) {
        await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { likes: username } }
        );
        return res.status(201).json("dec");
      }
      await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { likes: username } }
      );
      return res.status(201).json("inc");
    }
    next(createError(406, "PostId or username missing"));
  } catch (error) {
    next(error);
  }
};

export const editPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const selectPost = await Post.findById(id);
    if (!selectPost) return next(createError(404, "Post not Found in DB!!!"));
    const newPost = await Post.findByIdAndUpdate(
      id,
      {
        $set: {
          text: req.body.text || selectPost.text,
          imgUrl: req.body.imgUrl || selectPost.imgUrl,
        },
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const commentPost = async (req, res, next) => {
  try {
    const { username, image } = req.user;
    const postId = req.params.id;
    const { text } = req.body;
    if (username && postId) {
      const comment = await Comment.create({
        postId,
        text,
        owner: username,
        ownerpic: image,
      });
      return res.status(201).json("Comment created successfully");
    }
    next(createError(406, "CommentId or username missing"));
  } catch (error) {
    next(error);
  }
};

export const getIndPostComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const found = await Comment.find({ postId: id });
    if (found) {
      return res.status(200).json(found);
    }
    next(createError(404, "Comment not found"));
  } catch (error) {
    next(error);
  }
};
