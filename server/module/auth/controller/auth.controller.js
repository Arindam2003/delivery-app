import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import token from "../../../common/utils/token.js";
import { sendOtpMail } from "../../../common/utils/email.js";

export const deletebyEmail=async(req,res)=>{
    try{
        const {email}=req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }
        const result=await User.deleteOne({
            email
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if(result.deletedCount>0)
        {
            res.json({
                message:"user deleted successfully"
            })
        }
    }catch(e)
    {
        console.log(e);
    }
}

export const signup = async (req, res) => {
    try {
        const { fullname, email, password, mobile, role } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User already Exist"
            })
        }

        //! use zod or joi for validation in future
        if (password.length < 5) {
            return res.status(400).json({
                message: "Password is very poor"
            })
        }

        if (mobile.toString().length < 10) {
            return res.status(400).json({
                message: "Invalid mobile number"
            })
        }

        const hashedpass = await bcrypt.hash(password, 10); //!using salt 10 for hashing password

        user = await User.create({
            fullname,
            email,
            password: hashedpass,
            mobile,
            role
        })

        const gentoken =await token(user._id);

        res.cookie("token", gentoken, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(201).json(user);

    } catch (e) {
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User does not Exist"
            })
        }

        // if exist
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Password incorrect"
            })
        }

        const gentoken =await token(user._id);

        res.cookie("token", gentoken, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(200).json({
            message: "Signin Successfully",
            user: {
                _id: user._id,
                email: user.email,
                name: user.fullname
            }
        })

    } catch (e) {
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

export const signout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logout successfully"
        })
    } catch (error) {
        res.status(500).json(`signout error ${error}`)
    }
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        const otp = Math.floor(Math.random() * 9000 + 1000).toString();

        user.resetOtp = otp;
        user.expire = Date.now() + 5 * 60 * 1000;
        user.isOtpVerify = false;

        await user.save();

        await sendOtpMail(email, otp);

        return res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `send otp error ${error}`
        });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.resetOtp != otp || user.expire < Date.now()) {
            res.status(400).json({
                message: "Invalid/Expire Otp"
            })
        }
        user.isOtpVerify = true
        user.resetOtp = undefined
        user.expire = undefined
        await user.save();
        return res.status(200).json({
            message: "Otp verified successfully"
        })
    } catch (error) {
        return res.status(500).json(`verify otp error ${error}`)
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                message: "Email and new password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user || !user.isOtpVerify) {
            return res.status(400).json({
                message: "Invalid or OTP not verified"
            });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.isOtpVerify = false;

        await user.save();

        return res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Reset password error",
            error: error.message
        });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { fullname, email, mobile, role } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({ fullname, email, mobile, role })
        }
        const gentoken = token(user._id);
        res.cookie("token", gentoken, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "google auth error" })
    }
}

