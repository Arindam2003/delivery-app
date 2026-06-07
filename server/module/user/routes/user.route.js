import express from "express";
import { getCurrentUser } from "../controller/user.controller.js";
import isAuth from "../../../common/middleware/isAuth.js";

const userRouter=express.Router();

userRouter.get("/current",isAuth,getCurrentUser);

export default userRouter;