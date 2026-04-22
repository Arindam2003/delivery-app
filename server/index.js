import dotenv from "dotenv"
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import cors from "cors"
import userRouter from "./routes/user.router.js";
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