import express from "express";
import { register,login,userInfo,profileInfo,updateFollower,followersList } from "../controllers/auth.js";
import { verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/users/userInfo",verifyToken,userInfo)
router.get("/followers/followersList",verifyToken,followersList)
router.get("/user/userInfo/:id",verifyToken,profileInfo)
router.patch("/follow/:id",verifyToken,updateFollower)



export default router;