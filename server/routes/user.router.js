import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.js";

const userRouter=express.Router();

userRouter.get("/current", (req, res, next) => {
    console.log("✅ Route reached");
    next();
}, isAuth,getCurrentUser);

export default userRouter;