import express from "express";
import { createPost, getAllPosts,likePost,commentPost,getIndPostComment, editPost} from "../controllers/post.js";
import { verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

router.get("/",verifyToken,getAllPosts);
router.post("/",verifyToken,createPost);
router.patch("/like/:id",verifyToken,likePost);
router.patch("/edit/:id",verifyToken,editPost);
router.post("/comment/:id",verifyToken,commentPost);
router.get("/indcomment/:id",verifyToken,getIndPostComment);


export default router;
