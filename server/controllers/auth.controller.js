import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import token from "../utils/token.js";

export const signup=async(req,res)=>{
    try{
        const { fullname, email, password ,mobile,role}=req.body;
        let user=await User.findOne({email})
        if(user)
        {
            return res.json({
                message:"User already Exist"
            })
        }

        if(password.length<5)
        {
            return res.status(400).json({
                message:"Password is very poor"
            })
        }

        if(mobile.length<10)
        {
            return res.json({
                message:"Invalid mobile number"
            })
        }

        const hashedpass=await bcrypt.hash(password,10);

        user=await User.create({
            fullname,
            email,
            password:hashedpass,
            mobile,
            role
        })

        const gentoken=await token(user._id);
        res.cookie("token", gentoken,{
            secure:false,
            samesite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(200).json(user)

    }catch(e){
        return res.status(500).json({
            message:"Internal Server error"
        })
    }
}

export const signin=async(req,res)=>{
    try{
        const { email, password }=req.body;
        let user=await User.findOne({email})
        if(!user)
        {
            //! must use statuscode for not found or backend req.
            return res.status(404).json({
                message:"User does not Exist"
            })
        }

        const match=await bcrypt.compare(password,user.password)
        if(!match)
        {
            return res.status(401).json({
                message:"Password not match"
            })
        }

        const gentoken= token(user._id);
        res.cookie("token", gentoken,{
            secure:false,
            samesite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(200).json({
            message: "Signin Successfully",
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        })

    }catch(e){
        return res.status(500).json({
            message:"Internal Server error"
        })
    }
}

export const signout=async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({
            message:"Logout successfully"
        })
    }catch(error)
    {
        res.status(500).json(`signout error ${error}`)
    }
}