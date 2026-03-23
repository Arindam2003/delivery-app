import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected");
    }catch(err){
        console.log(err);
    }
}

export default connectDB;