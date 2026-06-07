import dotenv from "dotenv"
dotenv.config();
import express from "express";
import connectDB from "./common/db/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./module/auth/routes/auth.route.js";
import userRouter from "./module/user/routes/user.route.js";


const app=express();
const port = 8000;



//! this need to call first...
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})