import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String
    },
    mobile:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["user","owner","deliveryboy"],
        require:true
    },
    resetOtp:{
        type:String
    },
    isOtpVerify:{
        type:Boolean,
        default:false
    },
    expire:{
        type:Date
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema);

export default User