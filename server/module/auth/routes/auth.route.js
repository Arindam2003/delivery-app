import express from "express";
import { deletebyEmail, googleAuth, resetPassword, sendOtp, signin, signout, signup, verifyOtp } from "../controller/auth.controller.js";

const authRouter=express.Router();

authRouter.post("/delete", deletebyEmail)
authRouter.post("/signup",signup);
authRouter.post("/signin",signin);
authRouter.get("/signout",signout);
authRouter.post("/send-otp",sendOtp);
authRouter.post("/verify-otp",verifyOtp);
authRouter.post("/reset-password",resetPassword);
authRouter.post("/google-auth",googleAuth);



export default authRouter;